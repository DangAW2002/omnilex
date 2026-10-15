import { describe, expect, it } from 'vitest';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { explainConfig, mergeConfigLayers, normalizeConfig, parsePackItem, type ConfigLayer } from '../src/config.js';
import { discoverLayers, parentDir, resolvePath, toPosix } from '../src/project.js';
import { nodeProjectFS } from '../src/pack-install.js';

const layer = (kind: ConfigLayer['kind'], source: string, config: ConfigLayer['config']): ConfigLayer => ({ kind, source, dir: '/p', config });

describe('T-P2: layered configuration', () => {
  it('lets higher layers win for single values and records where each came from', () => {
    const effective = mergeConfigLayers([
      layer('user', '~/.termbridge/config.yaml', { locale: 'en', profile: 'lite' }),
      layer('project', '/p/.termbridge/config.yaml', { locale: 'vi' }),
      layer('local', '/p/.termbridge/config.local.yaml', { profile: 'standard' }),
      layer('session', '--pack', { tiers: { explanations: 'off' } }),
    ]);
    expect(effective.locale).toBe('vi');
    expect(effective.profile).toBe('standard');
    expect(effective.tiers.explanations).toBe('off');
    expect(effective.origins.locale).toBe('/p/.termbridge/config.yaml');
    expect(effective.origins.profile).toBe('/p/.termbridge/config.local.yaml');
    expect(effective.origins['tiers.explanations']).toBe('--pack');
    expect(effective.origins.fallbackLocales).toBe('default');
  });

  it('accumulates + and - pack operations in layer order, and packsReset drops what came before', () => {
    const effective = mergeConfigLayers([
      layer('user', 'user', { packs: ['+tech', '-finance'] }),
      layer('project', 'project', { packsReset: true, packs: ['it.ai-ml@^0.1', 'dev:./dist'] }),
      layer('session', 'session', { packs: ['-it.ai-ml'] }),
    ]);
    expect(effective.packOps.map((op) => op.op)).toEqual(['add', 'remove', 'reset', 'add', 'dev', 'remove']);
    expect(effective.packOps[3]).toMatchObject({ id: 'it.ai-ml', range: '^0.1', source: 'project' });
    expect(effective.packsConfigured).toBe(true);
    expect(mergeConfigLayers([]).packsConfigured).toBe(false);
  });

  it('takes the smallest limit across layers', () => {
    const effective = mergeConfigLayers([
      layer('user', 'user', { limits: { memoryMB: 64, diskMB: 100 } }),
      layer('project', 'project', { limits: { memoryMB: 128, diskMB: 50 } }),
    ]);
    expect(effective.limits).toEqual({ memoryMB: 64, diskMB: 50 });
    expect(effective.origins['limits.memoryMB']).toBe('user');
    expect(effective.origins['limits.diskMB']).toBe('project');
  });

  it('explains every value with its source', () => {
    const lines = explainConfig(mergeConfigLayers([
      layer('project', '/p/.termbridge/config.yaml', { locale: 'en', packs: ['+tech'], limits: { memoryMB: 32 } }),
    ]));
    expect(lines).toContain('locale = en  # /p/.termbridge/config.yaml');
    expect(lines).toContain('profile = standard  # default');
    expect(lines).toContain('limits.memoryMB = 32  # /p/.termbridge/config.yaml');
    expect(lines).toContain('packs +tech  # /p/.termbridge/config.yaml');
  });

  it('keeps known keys, warns on unknown or invalid ones', () => {
    const { config, warnings } = normalizeConfig({ locale: 'vi', profile: 'huge', colour: 'blue', limits: { memoryMB: -1 } }, 'f');
    expect(config).toEqual({ locale: 'vi', limits: {} });
    expect(warnings).toHaveLength(3);
    expect(parsePackItem('local:./glossary', { source: 's', dir: '/p' })).toEqual({ op: 'local', path: './glossary', dir: '/p', source: 's' });
  });

  it('walks up from cwd to the nearest root: true and reads config.local.yaml of the nearest project', async () => {
    const temp = toPosix(fs.mkdtempSync(path.join(os.tmpdir(), 'tb-config-')));
    try {
      const write = (rel: string, text: string) => {
        fs.mkdirSync(path.dirname(path.join(temp, rel)), { recursive: true });
        fs.writeFileSync(path.join(temp, rel), text);
      };
      write('home/config.yaml', 'locale: en\n');
      write('outer/.termbridge/config.yaml', 'packs: [+ignored]\n');
      write('outer/mono/.termbridge/config.yaml', 'root: true\nprofile: lite\n');
      write('outer/mono/app/.termbridge/config.yaml', 'packs: [+tech]\n');
      write('outer/mono/app/.termbridge/config.local.yaml', 'profile: standard\n');
      fs.mkdirSync(path.join(temp, 'outer/mono/app/src'), { recursive: true });

      const found = await discoverLayers(nodeProjectFS, { cwd: `${temp}/outer/mono/app/src`, home: `${temp}/home` });
      expect(found.layers.map((item) => [item.kind, item.source.slice(temp.length)])).toEqual([
        ['user', '/home/config.yaml'],
        ['project', '/outer/mono/.termbridge/config.yaml'],
        ['project', '/outer/mono/app/.termbridge/config.yaml'],
        ['local', '/outer/mono/app/.termbridge/config.local.yaml'],
      ]);
      expect(found.projectDir).toBe(`${temp}/outer/mono/app`);
      const effective = mergeConfigLayers(found.layers);
      expect(effective.locale).toBe('en');
      expect(effective.profile).toBe('standard');
      expect(effective.packOps.map((op: any) => op.id)).toEqual(['tech']);
    } finally {
      fs.rmSync(temp, { recursive: true, force: true });
    }
  });

  it('handles Windows and POSIX paths', () => {
    expect(parentDir('D:/a/b')).toBe('D:/a');
    expect(parentDir('D:/a')).toBe('D:/');
    expect(parentDir('D:/')).toBe('D:/');
    expect(parentDir('/a')).toBe('/');
    expect(resolvePath('D:/repo', './dist')).toBe('D:/repo/dist');
    expect(resolvePath('/repo/app', '../dist')).toBe('/repo/dist');
    expect(resolvePath('/repo', 'C:\\data\\dist')).toBe('C:/data/dist');
  });
});
