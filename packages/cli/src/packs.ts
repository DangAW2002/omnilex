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

// Session layer: --pack replaces the selection, TERMBRIDGE_PACKS adds to it.
function sessionLayer(pack?: string) {
  const explicit = packList(pack);
  if (explicit) return { source: '--pack', config: { packsReset: true, packs: explicit } };
  const fromEnv = packList(process.env.TERMBRIDGE_PACKS);
  if (fromEnv) return { source: 'TERMBRIDGE_PACKS', config: { packs: fromEnv } };
  return undefined;
}

export async function openCliProject(options: CliProjectOptions = {}) {
  const [{ openProject }, { nodeProjectFS, termbridgeHome }, { searchConfigHash }] = await Promise.all([
    import('@termbridge/core/dist/project.js'),
    import('@termbridge/core/dist/pack-install.js'),
    import('@termbridge/core/dist/search-config.js'),
  ]);
  return openProject(nodeProjectFS, {
    cwd: options.cwd || process.cwd(),
    home: options.home || termbridgeHome(),
    surface: 'cli',
    locale: options.locale,
    session: sessionLayer(options.pack),
    configHash: searchConfigHash(),
  });
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
    import('@termbridge/core/dist/pack-reader.js'),
    import('@termbridge/core/dist/pack-install.js'),
  ]);
  const cacheDir = ctx.projectDir
    ? path.join(ctx.projectDir, '.termbridge', '.cache')
    : path.join(ctx.home, 'cache');
  const store = new PackStore(nodePackIO, (message: string) => console.warn(pc.yellow(`⚠ ${message}`)), {
    manifest: ctx.manifest,
    disabled: ctx.disabled,
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
  if (chosen === 'project' && !ctx.projectDir) fail('Không có project (.termbridge/) ở đây; dùng --scope user / no project (.termbridge/) here; use --scope user');
  return chosen === 'project'
    ? { scope: 'project', file: path.join(ctx.projectDir, '.termbridge', 'config.yaml'), lockFile: path.join(ctx.projectDir, '.termbridge', 'lock.json') }
    : { scope: 'user', file: path.join(ctx.home, 'config.yaml'), lockFile: path.join(ctx.home, 'lock.json') };
}

function devSources(ctx: any): string[] {
  return ctx.catalog.sources.filter((source: any) => source.kind === 'dev').map((source: any) => source.dir);
}

function splitSpec(spec: string): { id: string; range?: string } {
  const at = spec.indexOf('@', 1);
  return at > 0 ? { id: spec.slice(0, at), range: spec.slice(at + 1) } : { id: spec };
}

const mb = (bytes: number) => `${(bytes / (1024 * 1024)).toFixed(2)} MB`;

// The lock holds every store pack the project resolves to, plus meta-packs it
// installed, each with the hashes of its copy.
async function rewriteLock(lockFile: string, options: { cwd?: string; home?: string; extra?: Array<{ id: string; entry: any }> } = {}) {
  const install = await import('@termbridge/core/dist/pack-install.js');
  const ctx = await openCliProject({ cwd: options.cwd, home: options.home });
  const lock = { lockfileVersion: 1 as const, packs: {} as Record<string, any> };
  for (const pack of [...ctx.resolved.packs, ...ctx.resolved.metas]) {
    if (pack.sourceId !== 'store') continue;
    const dir = path.dirname(pack.path);
    const { pack: json, packSha } = install.verifyPackDir(dir);
    const tiers: Record<string, Record<string, string>> = {};
    for (const [tier, info] of Object.entries(json.tiers || {})) {
      tiers[tier] = Object.fromEntries(Object.entries((info as any).files).map(([locale, file]: [string, any]) => [locale, file.sha256]));
    }
    lock.packs[pack.id] = { version: pack.version, sha256: packSha, store: path.basename(dir), tiers };
  }
  for (const { id, entry } of options.extra || []) lock.packs[id] ??= entry;
  install.writeLockFile(lockFile, lock);
  return lock;
}

export function registerPackCommands(program: Command): void {
  const configCmd = program.command('config').description('Inspect the layered Termbridge configuration');
  configCmd
    .command('explain')
    .description('Print the effective configuration and where every value comes from')
    .option('-p, --pack <ids>', 'Session pack selection')
    .action(async (options: { pack?: string }) => {
      const [{ explainConfig }] = await Promise.all([import('@termbridge/core/dist/config.js')]);
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
    .description('Add a pack (id[@range]) to the project or user configuration and install it')
    .option('-s, --scope <scope>', 'project | user (default: project when .termbridge/ exists)')
    .option('-f, --from <dir>', 'Built dist/ directory to install from')
    .action(async (spec: string, options: { scope?: string; from?: string }) => {
      const install = await import('@termbridge/core/dist/pack-install.js');
      const ctx = await openCliProject();
      const target = scopeFile(ctx, options.scope);
      const { id, range } = splitSpec(spec);
      const fromDev = !options.from && ctx.catalog.packs.some((pack: any) => pack.id === id && pack.sourceId !== 'store');
      let installed: any[] = [];
      if (!fromDev) {
        const sources = [...(options.from ? [path.resolve(options.from)] : []), ...devSources(ctx)];
        try {
          installed = install.installPack({ home: ctx.home, sources, id, range, diskMB: ctx.effective.limits.diskMB });
        } catch (error: any) {
          fail(error.message);
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
    .option('-s, --scope <scope>', 'project | user (default: project when .termbridge/ exists)')
    .action(async (id: string, options: { scope?: string }) => {
      const install = await import('@termbridge/core/dist/pack-install.js');
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
      const install = await import('@termbridge/core/dist/pack-install.js');
      const ctx = await openCliProject();
      const lock = install.readLockFile(ctx.lockPath);
      const sources = [...(options.from ? [path.resolve(options.from)] : []), ...devSources(ctx)];
      const problems: string[] = [];
      for (const [id, entry] of Object.entries(lock.packs) as Array<[string, any]>) {
        try {
          install.installPack({ home: ctx.home, sources, id, range: entry.version, exactSha: entry.sha256, diskMB: ctx.effective.limits.diskMB });
        } catch (error: any) {
          // A pinned copy already in the store is fine even when no source offers it.
          if (!fs.existsSync(path.join(ctx.home, 'store', entry.store))) problems.push(error.message);
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
      for (const missing of ctx.resolved.missing) {
        const { id, range } = splitSpec(missing);
        try {
          install.installPack({ home: ctx.home, sources, id, range, diskMB: ctx.effective.limits.diskMB });
        } catch (error: any) {
          problems.push(error.message);
        }
      }
      const next = await rewriteLock(ctx.lockPath, { extra: Object.entries(lock.packs).map(([id, entry]) => ({ id, entry })) });
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
      const install = await import('@termbridge/core/dist/pack-install.js');
      const ctx = await openCliProject();
      const sources = [...(options.from ? [path.resolve(options.from)] : []), ...devSources(ctx)];
      const installed: any[] = [];
      for (const op of ctx.effective.packOps as any[]) {
        if (op.op !== 'add') continue;
        if (ctx.catalog.packs.some((pack: any) => pack.id === op.id && pack.sourceId !== 'store')) continue;
        try {
          installed.push(...install.installPack({ home: ctx.home, sources, id: op.id, range: op.range, diskMB: ctx.effective.limits.diskMB }));
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
    .command('verify')
    .description('Check every store copy against its pack.json and lock.json')
    .action(async () => {
      const install = await import('@termbridge/core/dist/pack-install.js');
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
      const install = await import('@termbridge/core/dist/pack-install.js');
      const result = install.pruneStore(install.termbridgeHome());
      console.log(pc.bold('\nTermbridge pack prune:\n'));
      for (const name of result.removed) console.log(`  ${pc.red('xóa / removed')} ${name}`);
      for (const name of result.kept) console.log(`  ${pc.green('giữ / kept')} ${name}`);
      for (const dir of result.forgotten) console.log(`  ${pc.dim('bỏ project / forgot')} ${dir}`);
      console.log('');
    });
}

