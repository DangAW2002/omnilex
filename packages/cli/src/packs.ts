// tb pack … and tb config explain (Plan 3.3-3.5). Core is imported lazily so
// the other commands keep their fast start.
import fs from 'node:fs';
import path from 'node:path';
import pc from 'picocolors';
import type { Command } from 'commander';

export interface CliProjectOptions {
  cwd?: string;
  home?: string;
  locale?: string;
  pack?: string;
}

function packList(value?: string): string[] | undefined {
  const packs = (value || '').split(',').map((item) => item.trim()).filter(Boolean);
  return packs.length > 0 ? packs : undefined;
}

// Session layer: --pack replaces the selection, OMNILEX_PACKS adds to it.
function sessionLayer(pack?: string) {
  const explicit = packList(pack);
  if (explicit) return { source: '--pack', config: { packsReset: true, packs: explicit } };
  const fromEnv = packList(process.env.OMNILEX_PACKS);
  if (fromEnv) return { source: 'OMNILEX_PACKS', config: { packs: fromEnv } };
  return undefined;
}

export async function openCliProject(options: CliProjectOptions = {}) {
  const [{ openProject }, { nodeProjectFS, omnilexHome }, { searchConfigHash }] = await Promise.all([
    import('@omnilex/core/dist/project.js'),
    import('@omnilex/core/dist/pack-install.js'),
    import('@omnilex/core/dist/search-config.js'),
  ]);
  const open = () => openProject(nodeProjectFS, {
    cwd: options.cwd || process.cwd(),
    home: options.home || omnilexHome(),
    surface: 'cli',
    locale: options.locale,
    session: sessionLayer(options.pack),
    configHash: searchConfigHash(),
  });
  const ctx = await open();
  if (!ctx.effective.packOps.some((op: any) => op.op === 'local')) return ctx;
  // local: glossaries are built on demand, then the project is read again.
  const { ensureLocalPacks } = await import('@omnilex/core/dist/glossary.js');
  const built = ensureLocalPacks(ctx);
  for (const notice of built.notices) console.warn(pc.yellow(`⚠ ${notice}`));
  return built.changed ? open() : ctx;
}

// A PackStore over the resolved packs, or null when nothing resolved (the
// caller then falls back to the repository layout).
export async function openCliStore(options: CliProjectOptions = {}) {
  const ctx = await openCliProject(options);
  for (const notice of ctx.notices) console.warn(pc.yellow(`⚠ ${notice}`));
  if (ctx.plan.packs.length === 0) return { ctx, store: null };
  if (ctx.stale) {
    console.warn(pc.yellow('⚠ dist/ cũ hơn concepts/. Đang quay về quét concepts/ trực tiếp.'));
    return { ctx, store: null };
  }
  const [{ PackStore }, { nodePackIO, fileIndexCache }] = await Promise.all([
    import('@omnilex/core/dist/pack-reader.js'),
    import('@omnilex/core/dist/pack-install.js'),
  ]);
  const cacheDir = ctx.projectDir
    ? path.join(ctx.projectDir, '.omnilex', '.cache')
    : path.join(ctx.home, 'cache');
  const store = new PackStore(nodePackIO, (message: string) => console.warn(pc.yellow(`⚠ ${message}`)), {
    manifest: ctx.manifest,
    disabled: ctx.disabled,
    overlay: ctx.overlay,
    cache: fileIndexCache(cacheDir),
  });
  return { ctx, store: store.available ? store : null };
}

function fail(message: string): never {
  console.error(pc.red(`✖ ${message}`));
  process.exit(1);
}

function scopeFile(ctx: any, scope: string | undefined): { scope: 'project' | 'user'; file: string; lockFile: string } {
  const chosen = scope === 'user' || scope === 'project' ? scope : ctx.projectDir ? 'project' : 'user';
  if (chosen === 'project' && !ctx.projectDir) fail('Không có project (.omnilex/) ở đây; dùng --scope user / no project (.omnilex/) here; use --scope user');
  return chosen === 'project'
    ? { scope: 'project', file: path.join(ctx.projectDir, '.omnilex', 'config.yaml'), lockFile: path.join(ctx.projectDir, '.omnilex', 'lock.json') }
    : { scope: 'user', file: path.join(ctx.home, 'config.yaml'), lockFile: path.join(ctx.home, 'lock.json') };
}

function devSources(ctx: any): string[] {
  return ctx.catalog.sources.filter((source: any) => source.kind === 'dev').map((source: any) => source.dir);
}

// Installs id@range from a built dist (--from, dev sources) or, failing that,
// from the configured registries. exactSha pins the pack.json of a lock entry.
async function acquire(ctx: any, options: { id: string; range?: string; from?: string; exactSha?: string }): Promise<any[]> {
  const install = await import('@omnilex/core/dist/pack-install.js');
  const diskMB = ctx.effective.limits.diskMB;
  const errors: string[] = [];
  const sources = [...(options.from ? [path.resolve(options.from)] : []), ...devSources(ctx)];
  if (sources.length) {
    try {
      return install.installPack({ home: ctx.home, sources, id: options.id, range: options.range, exactSha: options.exactSha, diskMB });
    } catch (error: any) {
      errors.push(error.message);
    }
  }
  const registries = (ctx.effective.registries as string[]).map((url) => (/^(https?|file):/i.test(url) ? url : path.resolve(ctx.cwd, url)));
  if (registries.length) {
    const { installFromRegistries } = await import('@omnilex/core/dist/registry.js');
    try {
      const got = await installFromRegistries({ home: ctx.home, registries, id: options.id, range: options.range, diskMB });
      if (options.exactSha && got[0].entry.sha256 !== options.exactSha) {
        throw new Error(`${options.id}@${got[0].version}: sha256 khác lockfile / sha256 differs from the lockfile`);
      }
      return got.map((pack: any) => ({ ...pack, entry: { ...pack.entry, origin: pack.origin } }));
    } catch (error: any) {
      errors.push(error.message);
    }
  }
  throw new Error(errors.join('\n') || `Không có nguồn để cài ${options.id}: dùng --from <dist> hoặc khai báo registries / no source to install ${options.id}: pass --from <dist> or configure registries`);
}

function splitSpec(spec: string): { id: string; range?: string } {
  const at = spec.indexOf('@', 1);
  return at > 0 ? { id: spec.slice(0, at), range: spec.slice(at + 1) } : { id: spec };
}

const mb = (bytes: number) => `${(bytes / (1024 * 1024)).toFixed(2)} MB`;

// The lock holds every store pack the project resolves to, plus meta-packs it
// installed, each with the hashes of its copy.
async function rewriteLock(lockFile: string, options: { cwd?: string; home?: string; extra?: Array<{ id: string; entry: any }> } = {}) {
  const install = await import('@omnilex/core/dist/pack-install.js');
  const ctx = await openCliProject({ cwd: options.cwd, home: options.home });
  const previous = install.readLockFile(lockFile);
  const lock = { lockfileVersion: 1 as const, packs: {} as Record<string, any> };
  for (const pack of [...ctx.resolved.packs, ...ctx.resolved.metas]) {
    if (pack.sourceId !== 'store') continue;
    const dir = path.dirname(pack.path);
    const { pack: json, packSha } = install.verifyPackDir(dir);
    const tiers: Record<string, Record<string, string>> = {};
    for (const [tier, info] of Object.entries(json.tiers || {})) {
      tiers[tier] = Object.fromEntries(Object.entries((info as any).files).map(([locale, file]: [string, any]) => [locale, file.sha256]));
    }
    const store = path.basename(dir);
    const origin = options.extra?.find((item) => item.id === pack.id && item.entry.store === store)?.entry.origin
      ?? (previous.packs[pack.id]?.store === store ? previous.packs[pack.id].origin : undefined);
    lock.packs[pack.id] = { version: pack.version, sha256: packSha, store, ...(origin ? { origin } : {}), tiers };
  }
  for (const { id, entry } of options.extra || []) lock.packs[id] ??= entry;
  install.writeLockFile(lockFile, lock);
  return lock;
}

export function registerPackCommands(program: Command): void {
  program
    .command('export')
    .description('Export the packs this project loads as CSV, TBX-Basic or JSONL')
    .requiredOption('-f, --format <format>', 'csv | tbx | jsonl')
    .requiredOption('-o, --out <file>', 'Output file')
    .option('-p, --pack <ids>', 'Comma-separated pack ids (default: what the project loads)')
    .option('-l, --locales <locales>', 'Comma-separated locales', 'vi,en')
    .action(async (options: { format: string; out: string; pack?: string; locales: string }) => {
      const exchange = await import('@omnilex/core/dist/exchange.js');
      if (!['csv', 'tbx', 'jsonl'].includes(options.format)) fail(`--format phải là csv, tbx hoặc jsonl / must be csv, tbx or jsonl`);
      const { store } = await openCliStore({ pack: options.pack });
      if (!store) fail('Không có gói nào để xuất; chạy pnpm tb build hoặc tb pack add / no packs to export; run pnpm tb build or tb pack add');
      const rows: any[] = [];
      let missing = 0;
      for (const locale of options.locales.split(',').map((item) => item.trim()).filter(Boolean)) {
        for (const packId of store.contentPacks()) {
          for (const card of store.cards(packId, locale)) {
            const record = store.explanation(card.id, locale);
            if (!record) {
              missing++;
              continue;
            }
            const row = exchange.rowFromExplanation(card, record, locale);
            if (row && !rows.some((item) => item.id === row.id && item.locale === row.locale)) rows.push(row);
          }
        }
      }
      const text = options.format === 'csv' ? exchange.toCsv(rows) : options.format === 'tbx' ? exchange.toTbx(rows) : exchange.toJsonl(rows);
      fs.mkdirSync(path.dirname(path.resolve(options.out)), { recursive: true });
      fs.writeFileSync(options.out, text, 'utf-8');
      console.log(pc.green(`\n✔ ${rows.length} dòng (khái niệm × locale) → ${options.out}`));
      if (missing) console.log(pc.yellow(`  ⚠ ${missing} mục không có bài giải thích (gói thiếu tier explanations), bỏ qua / entries without explanations skipped`));
      console.log('');
    });

  program
    .command('import')
    .description('Import CSV or TBX into concepts/ (always draft, drafted_by: import) or a project glossary')
    .requiredOption('--from <format>', 'csv | tbx')
    .requiredOption('--into <dir>', 'concepts/ or .omnilex/glossary/')
    .option('--overwrite', 'Replace concept directories that already exist')
    .argument('<file>')
    .action(async (file: string, options: { from: string; into: string; overwrite?: boolean }) => {
      const exchange = await import('@omnilex/core/dist/exchange.js');
      const text = fs.readFileSync(file, 'utf-8');
      let rows: any[] = [];
      try {
        rows = options.from === 'csv' ? exchange.fromCsv(text) : options.from === 'tbx' ? exchange.fromTbx(text) : fail('--from phải là csv hoặc tbx / must be csv or tbx');
      } catch (error: any) {
        fail(error.message);
      }
      const target = path.resolve(options.into);
      const mode = target.split(path.sep).includes('.omnilex') ? 'glossary' : 'repository';
      const result = exchange.writeConcepts(rows, target, { mode, overwrite: options.overwrite });
      console.log(pc.bold(`\nOmniLex import (${options.from} → ${options.into}, ${mode === 'repository' ? 'draft, drafted_by: import' : 'glossary'}):\n`));
      for (const id of result.written) console.log(`  ${pc.green('ghi / wrote')} ${id}`);
      for (const line of result.skipped) console.log(`  ${pc.dim(line)}`);
      for (const line of result.errors) console.log(`  ${pc.red(line)}`);
      if (mode === 'repository' && result.written.length) console.log(pc.dim('\n  Tiếp theo / next: pnpm ol validate --strict'));
      console.log('');
      if (result.errors.length) process.exitCode = 1;
    });

  program
    .command('overlay')
    .description('Project overlay tools')
    .command('propose')
    .description('Draft the concepts/ changes an overlay would become upstream')
    .action(async () => {
      const ctx = await openCliProject();
      const overlay = ctx.overlay;
      if (!ctx.overlayPath || (!Object.keys(overlay.concepts).length && !overlay.exclude.length && !Object.keys(overlay.prefer).length)) {
        console.log(pc.yellow('\nKhông có overlay / no overlay (.omnilex/overrides.yaml)\n'));
        return;
      }
      console.log(pc.bold(`\nBản nháp thay đổi cho concepts/ từ ${ctx.overlayPath}:\n`));
      for (const [id, change] of Object.entries(overlay.concepts) as Array<[string, any]>) {
        if (change.autolink) console.log(`  concepts/${id}/<locale>.md: autolink.label: ${change.autolink}`);
        for (const [locale, aliases] of Object.entries(change.aliases || {}) as Array<[string, string[]]>) {
          for (const alias of aliases) {
            console.log(alias.startsWith('-')
              ? `  concepts/${id}/${locale}.md: bỏ alias / remove alias "${alias.slice(1)}"`
              : `  concepts/${id}/${locale}.md: thêm alias / add alias "${alias.replace(/^\+/, '')}" (cần label_evidence nếu là nhãn tiếng Việt mới)`);
          }
        }
      }
      for (const id of overlay.exclude) console.log(pc.dim(`  exclude ${id}: chỉ áp cho project này, không đề xuất lên repo / project-only, nothing to propose`));
      for (const [key, id] of Object.entries(overlay.prefer)) {
        console.log(`  prefer ${key} → ${id}: cân nhắc qualifier hoặc confusable_notes cho các nghĩa của "${key}" / consider qualifiers or confusable_notes`);
      }
      console.log(pc.dim('\n  Sửa thủ công rồi chạy pnpm ol validate --strict; khái niệm vẫn ở status hiện tại / edit by hand, then validate\n'));
    });

  program
    .command('registry')
    .description('Registry tools')
    .command('build <outDir>')
    .description('Write every pack of a built dist/ as .tbpack plus registry.json')
    .option('--dist <dir>', 'Built dist/ directory', 'dist')
    .option('--base-url <url>', 'URL prefix of the .tbpack files in registry.json')
    .option('--name <name>', 'Registry name')
    .option('--official', 'Mark this registry as official')
    .action(async (outDir: string, options: { dist: string; baseUrl?: string; name?: string; official?: boolean }) => {
      const { buildRegistry } = await import('@omnilex/core/dist/registry.js');
      const registry = buildRegistry({
        distDir: path.resolve(options.dist),
        outDir: path.resolve(outDir),
        baseUrl: options.baseUrl,
        name: options.name,
        official: options.official,
      });
      console.log(pc.green(`\n✔ registry.json: ${Object.keys(registry.packs).length} gói / packs → ${path.join(outDir, 'registry.json')}\n`));
    });

  const configCmd = program.command('config').description('Inspect the layered OmniLex configuration');
  configCmd
    .command('explain')
    .description('Print the effective configuration and where every value comes from')
    .option('-p, --pack <ids>', 'Session pack selection')
    .action(async (options: { pack?: string }) => {
      const [{ explainConfig }] = await Promise.all([import('@omnilex/core/dist/config.js')]);
      const ctx = await openCliProject({ pack: options.pack });
      console.log(pc.bold('\nCấu hình hiệu lực / effective configuration:\n'));
      for (const line of explainConfig(ctx.effective)) console.log(`  ${line}`);
      console.log(pc.bold('\nGói được nạp / packs to load:\n'));
      for (const pack of ctx.plan.packs) console.log(`  ${pack.pack.id}@${pack.pack.version}  # ${pack.pack.sourceId === 'store' ? 'store' : 'dev'}`);
      for (const notice of ctx.notices) console.log(pc.yellow(`  ⚠ ${notice}`));
      console.log('');
    });

  const packCmd = program.command('pack').description('Manage installed packs (store, lockfile, selection)');

  packCmd
    .command('list')
    .description('List the packs the current project resolves to')
    .option('-p, --pack <ids>', 'Session pack selection')
    .action(async (options: { pack?: string }) => {
      const ctx = await openCliProject({ pack: options.pack });
      console.log(pc.bold(`\nGói / packs (${ctx.plan.packs.length}):\n`));
      for (const { pack } of ctx.plan.packs) {
        console.log(`  ${pc.green(pack.id)}@${pack.version}  ${pc.dim(pack.sourceId === 'store' ? 'store' : 'dev')}  ${pack.concepts} khái niệm`);
      }
      for (const pack of ctx.plan.dropped) console.log(pc.yellow(`  ${pack.id} (bỏ do giới hạn / dropped by limits)`));
      for (const notice of ctx.notices) console.log(pc.yellow(`  ⚠ ${notice}`));
      console.log('');
    });

  packCmd
    .command('status')
    .description('Show which tiers each pack loads, their size and load time')
    .option('-l, --locale <locale>', 'Locale', 'vi')
    .option('-p, --pack <ids>', 'Session pack selection')
    .action(async (options: { locale: string; pack?: string }) => {
      const { ctx, store } = await openCliStore({ locale: options.locale, pack: options.pack });
      console.log(pc.bold(`\nProfile: ${ctx.plan.profile}  |  ước tính / estimate ${ctx.plan.estimateMB.toFixed(2)} MB${ctx.plan.limitMB ? ` / limit ${ctx.plan.limitMB} MB` : ''}\n`));
      for (const { pack, tiers } of ctx.plan.packs) {
        const started = performance.now();
        if (store) {
          store.cards(pack.id, options.locale);
          store.terms(pack.id, options.locale);
          if (tiers.search === 'eager') store.index(pack.id, options.locale);
        }
        const elapsed = performance.now() - started;
        const parts = (['terms', 'cards', 'search', 'explanations'] as const).map((tier) => {
          const bytes = pack.tiers?.[tier]?.files[options.locale]?.bytes || 0;
          return `${tier}=${tiers[tier]} ${mb(bytes)}`;
        });
        console.log(`  ${pc.green(pack.id)}@${pack.version}  ${parts.join('  ')}  ${elapsed.toFixed(1)} ms`);
      }
      for (const step of ctx.plan.steps) console.log(pc.yellow(`  ↓ ${step}`));
      console.log('');
    });

  packCmd
    .command('add <spec>')
    .description('Add a pack (id[@range], ./x.tbpack or https://…/x.tbpack) to the project or user configuration and install it')
    .option('-s, --scope <scope>', 'project | user (default: project when .omnilex/ exists)')
    .option('-f, --from <dir>', 'Built dist/ directory to install from')
    .action(async (spec: string, options: { scope?: string; from?: string }) => {
      const install = await import('@omnilex/core/dist/pack-install.js');
      const ctx = await openCliProject();
      const target = scopeFile(ctx, options.scope);
      let installed: any[] = [];
      let { id, range } = splitSpec(spec);
      let fromDev = false;
      if (/\.(olpack|tbpack)$/i.test(spec) || /^https?:\/\//i.test(spec)) {
        // A .tbpack file or URL: checked and unpacked into the store as is.
        const [{ fetchBytes }, { importTbpack }] = await Promise.all([
          import('@omnilex/core/dist/registry.js'),
          import('@omnilex/core/dist/tbpack.js'),
        ]);
        try {
          const bytes = await fetchBytes(/^https?:\/\//i.test(spec) ? spec : path.resolve(spec));
          const pack = importTbpack(bytes, { home: ctx.home, diskMB: ctx.effective.limits.diskMB });
          installed = [{ ...pack, entry: { ...pack.entry, origin: spec } }];
          ({ id, range } = { id: pack.id, range: undefined });
        } catch (error: any) {
          fail(error.message);
        }
      } else {
        fromDev = !options.from && ctx.catalog.packs.some((pack: any) => pack.id === id && pack.sourceId !== 'store');
        if (!fromDev) {
          try {
            installed = await acquire(ctx, { id, range, from: options.from });
          } catch (error: any) {
            fail(error.message);
          }
        }
      }
      const item = `+${id}${range ? `@${range}` : ''}`;
      install.editConfigPacks(target.file, (packs: string[]) => [
        ...packs.filter((value) => value !== `-${id}` && value.replace(/^\+/, '').split('@')[0] !== id),
        item,
      ]);
      if (target.scope === 'project') install.registerProject(ctx.home, ctx.projectDir!);
      const lock = await rewriteLock(target.lockFile, { extra: installed.map((pack) => ({ id: pack.id, entry: pack.entry })) });
      console.log(pc.green(`\n✔ Đã thêm ${item} / added ${item}`));
      for (const pack of installed) console.log(`  ${pack.reused ? 'có sẵn / reused' : 'đã cài / installed'}: ${pack.store}`);
      if (fromDev) console.log(pc.dim('  lấy từ bản build dev, không cần cài / served by the dev build, nothing to install'));
      console.log(`  ghi / wrote: ${target.file}`);
      console.log(`  ghi / wrote: ${target.lockFile} (${Object.keys(lock.packs).length} gói)\n`);
    });

  packCmd
    .command('remove <id>')
    .description('Remove a pack from the project or user configuration')
    .option('-s, --scope <scope>', 'project | user (default: project when .omnilex/ exists)')
    .action(async (id: string, options: { scope?: string }) => {
      const install = await import('@omnilex/core/dist/pack-install.js');
      const ctx = await openCliProject();
      const target = scopeFile(ctx, options.scope);
      let removed = false;
      install.editConfigPacks(target.file, (packs: string[]) => {
        const kept = packs.filter((value) => value.startsWith('-') || value.replace(/^\+/, '').split('@')[0] !== id);
        removed = kept.length !== packs.length;
        return removed ? kept : [...kept, `-${id}`];
      });
      const lock = await rewriteLock(target.lockFile);
      console.log(pc.green(`\n✔ ${removed ? 'Đã bỏ' : 'Đã thêm loại trừ'} ${id} / ${removed ? 'removed' : 'excluded'} ${id}`));
      console.log(`  ghi / wrote: ${target.file}`);
      console.log(`  ghi / wrote: ${target.lockFile} (${Object.keys(lock.packs).length} gói)`);
      console.log(pc.dim('  Bản trong kho vẫn giữ; dọn bằng tb pack prune / the store copy stays; clean up with tb pack prune\n'));
    });

  packCmd
    .command('install')
    .description('Install the packs in lock.json (and missing configured packs)')
    .option('--frozen', 'Fail instead of changing lock.json; every copy must match it')
    .option('-f, --from <dir>', 'Built dist/ directory to install from')
    .action(async (options: { frozen?: boolean; from?: string }) => {
      const install = await import('@omnilex/core/dist/pack-install.js');
      const ctx = await openCliProject();
      const lock = install.readLockFile(ctx.lockPath);
      const problems: string[] = [];
      for (const [id, entry] of Object.entries(lock.packs) as Array<[string, any]>) {
        // A pinned copy already in the store needs no source.
        if (fs.existsSync(path.join(ctx.home, 'store', entry.store))) continue;
        try {
          await acquire(ctx, { id, range: entry.version, from: options.from, exactSha: entry.sha256 });
        } catch (error: any) {
          problems.push(error.message);
        }
      }
      if (options.frozen) {
        const after = await openCliProject();
        const store = after.resolved.packs.filter((pack: any) => pack.sourceId === 'store');
        const lockedContent = Object.keys(lock.packs).filter((id) => after.catalog.packs.some((pack: any) => pack.id === id && pack.kind === 'content'));
        if (after.resolved.missing.length) problems.push(`thiếu gói / missing packs: ${after.resolved.missing.join(', ')}`);
        for (const pack of store) {
          if (lock.packs[pack.id]?.version !== pack.version) problems.push(`${pack.id}@${pack.version} không có trong lock.json / is not in lock.json`);
        }
        for (const id of lockedContent) {
          if (!store.some((pack: any) => pack.id === id)) problems.push(`${id} có trong lock.json nhưng không còn được cấu hình / is locked but no longer configured`);
        }
        problems.push(...install.verifyLock(ctx.home, lock));
        if (problems.length) fail(`install --frozen thất bại / failed:\n  - ${[...new Set(problems)].join('\n  - ')}`);
        console.log(pc.green(`\n✔ ${Object.keys(lock.packs).length} gói khớp lock.json / packs match lock.json\n`));
        return;
      }
      const added: any[] = [];
      for (const missing of ctx.resolved.missing) {
        const { id, range } = splitSpec(missing);
        try {
          added.push(...await acquire(ctx, { id, range, from: options.from }));
        } catch (error: any) {
          problems.push(error.message);
        }
      }
      const next = await rewriteLock(ctx.lockPath, {
        extra: [...Object.entries(lock.packs).map(([id, entry]) => ({ id, entry })), ...added.map((pack) => ({ id: pack.id, entry: pack.entry }))],
      });
      if (ctx.projectDir) install.registerProject(ctx.home, ctx.projectDir);
      for (const problem of problems) console.warn(pc.yellow(`⚠ ${problem}`));
      console.log(pc.green(`\n✔ lock.json: ${Object.keys(next.packs).length} gói / packs`));
      console.log(`  ghi / wrote: ${ctx.lockPath}\n`);
      if (problems.length) process.exitCode = 1;
    });

  packCmd
    .command('update')
    .description('Install the newest versions the configured ranges allow and rewrite lock.json')
    .option('-f, --from <dir>', 'Built dist/ directory to install from')
    .action(async (options: { from?: string }) => {
      const install = await import('@omnilex/core/dist/pack-install.js');
      const ctx = await openCliProject();
      const installed: any[] = [];
      for (const op of ctx.effective.packOps as any[]) {
        if (op.op !== 'add') continue;
        if (ctx.catalog.packs.some((pack: any) => pack.id === op.id && pack.sourceId !== 'store')) continue;
        try {
          installed.push(...await acquire(ctx, { id: op.id, range: op.range, from: options.from }));
        } catch (error: any) {
          console.warn(pc.yellow(`⚠ ${error.message}`));
        }
      }
      // Drop the pins so the newest copies win, then lock what resolves.
      install.writeLockFile(ctx.lockPath, { lockfileVersion: 1, packs: {} });
      const next = await rewriteLock(ctx.lockPath, { extra: installed.map((pack) => ({ id: pack.id, entry: pack.entry })) });
      console.log(pc.green(`\n✔ lock.json: ${Object.keys(next.packs).length} gói / packs`));
      for (const [id, entry] of Object.entries(next.packs) as Array<[string, any]>) console.log(`  ${id}@${entry.version}`);
      console.log('');
    });

  packCmd
    .command('export [ids...]')
    .description('Write packs as .tbpack files (whole, or derived by --domain, --locales, --tiers, --effective)')
    .requiredOption('-o, --out <path>', 'Output .tbpack file, or a directory for several packs')
    .option('-d, --domain <path>', 'Keep only concepts under this taxonomy path')
    .option('-l, --locales <locales>', 'Comma-separated locales to keep')
    .option('-t, --tiers <tiers>', 'Comma-separated tiers to keep (terms,cards,search,explanations)')
    .option('--effective', 'One pack with exactly what this project loads, overlay included')
    .option('--id <id>', 'Pack id of a derived pack (default local.<domain> or local.effective)')
    .action(async (ids: string[], options: { out: string; domain?: string; locales?: string; tiers?: string; effective?: boolean; id?: string }) => {
      const [tbpack, { domainMatches }, { overlayConcepts }] = await Promise.all([
        import('@omnilex/core/dist/tbpack.js'),
        import('@omnilex/core/dist/search-config.js'),
        import('@omnilex/core/dist/overlay.js'),
      ]);
      const ctx = await openCliProject();
      const known = new Map<string, any>([...ctx.catalog.packs, ...ctx.resolved.packs].map((pack: any) => [pack.id, pack]));
      const chosen = ids.length
        ? ids.map((id) => known.get(id) || fail(`Không có gói ${id} / no pack ${id}`))
        : ctx.plan.packs.map((item: any) => item.pack);
      const derived = options.effective || options.domain || options.locales || options.tiers;
      const written: string[] = [];
      if (!derived) {
        const many = chosen.length > 1 || (fs.existsSync(options.out) && fs.statSync(options.out).isDirectory());
        for (const pack of chosen) {
          const file = many ? path.join(options.out, `${pack.id}-${pack.version}.tbpack`) : options.out;
          fs.mkdirSync(path.dirname(path.resolve(file)), { recursive: true });
          fs.writeFileSync(file, tbpack.packDirToTbpack(path.dirname(pack.path)));
          written.push(file);
        }
      } else {
        const content = chosen.filter((pack: any) => pack.kind === 'content');
        const slug = (options.domain || 'export').replace(/[^a-z0-9]+/gi, '-').replace(/^-|-$/g, '').toLowerCase();
        const id = options.id || (options.effective ? 'local.effective' : `local.${slug}`);
        const overlay = options.effective ? ctx.overlay : null;
        const { dir } = tbpack.derivePack(content.map((pack: any) => path.dirname(pack.path)), {
          id,
          title: { vi: id, en: id },
          version: content[0]?.version || '0.0.0',
          filter: options.domain ? (card: any) => card.domains.some((domain: string) => domainMatches(domain, options.domain!)) : undefined,
          locales: options.locales?.split(',').map((item) => item.trim()).filter(Boolean),
          tiers: options.tiers?.split(',').map((item) => item.trim()).filter(Boolean) as any,
          transform: overlay ? (locale: string, concepts: any[]) => overlayConcepts(overlay, locale, concepts) : undefined,
        });
        fs.mkdirSync(path.dirname(path.resolve(options.out)), { recursive: true });
        fs.writeFileSync(options.out, tbpack.filesToTbpack(dir));
        written.push(options.out);
      }
      console.log(pc.green(`\n✔ Đã xuất ${written.length} gói / exported ${written.length} pack(s)`));
      for (const file of written) console.log(`  ${file}`);
      console.log('');
    });

  packCmd
    .command('verify')
    .description('Check every store copy against its pack.json and lock.json')
    .action(async () => {
      const install = await import('@omnilex/core/dist/pack-install.js');
      const ctx = await openCliProject();
      const problems = install.verifyLock(ctx.home, install.readLockFile(ctx.lockPath));
      for (const pack of ctx.catalog.packs.filter((item: any) => item.sourceId === 'store')) {
        problems.push(...install.verifyPackDir(path.dirname(pack.path)).problems);
      }
      if (problems.length) fail(`verify:\n  - ${[...new Set(problems)].join('\n  - ')}`);
      console.log(pc.green('\n✔ Kho và lock.json khớp / store and lock.json match\n'));
    });

  packCmd
    .command('prune')
    .description('Delete store copies no registered project references')
    .action(async () => {
      const install = await import('@omnilex/core/dist/pack-install.js');
      const result = install.pruneStore(install.omnilexHome());
      console.log(pc.bold('\nOmniLex pack prune:\n'));
      for (const name of result.removed) console.log(`  ${pc.red('xóa / removed')} ${name}`);
      for (const name of result.kept) console.log(`  ${pc.green('giữ / kept')} ${name}`);
      for (const dir of result.forgotten) console.log(`  ${pc.dim('bỏ project / forgot')} ${dir}`);
      console.log('');
    });
}

