#!/usr/bin/env node
import { execSync } from 'node:child_process';
import { readdirSync, statSync, readFileSync, existsSync } from 'node:fs';
import { resolve, join, relative } from 'node:path';
import { createHash } from 'node:crypto';

const ROOT_DIR = resolve('.');
const TARGET_DIRS = [
  'dist',
  'packages/claude-mod/data',
  'packages/claude-mod/hooks/runtime',
];

function hashFile(filepath) {
  const content = readFileSync(filepath);
  return createHash('sha256').update(content).digest('hex');
}

function collectHashes(baseDir, currentDir = baseDir, result = {}) {
  const fullPath = resolve(ROOT_DIR, currentDir);
  if (!existsSync(fullPath)) return result;

  const entries = readdirSync(fullPath, { withFileTypes: true });
  // Sắp xếp thứ tự file ổn định
  entries.sort((a, b) => a.name.localeCompare(b.name));

  for (const entry of entries) {
    const entryFullPath = join(fullPath, entry.name);
    const relPath = relative(ROOT_DIR, entryFullPath).replace(/\\/g, '/');
    if (entry.isDirectory()) {
      collectHashes(baseDir, entryFullPath, result);
    } else if (entry.isFile()) {
      result[relPath] = hashFile(entryFullPath);
    }
  }
  return result;
}

function runBuild(iteration) {
  process.stdout.write(`[check:deterministic] Running build pass ${iteration}...\n`);
  execSync('pnpm build', { stdio: 'inherit', cwd: ROOT_DIR });
}

function snapshotAllTargets() {
  const snapshot = {};
  for (const dir of TARGET_DIRS) {
    collectHashes(dir, dir, snapshot);
  }
  return snapshot;
}

function main() {
  process.stdout.write('=== Checking Build Determinism (D-4) ===\n');

  // Pass 1
  runBuild(1);
  const pass1Hashes = snapshotAllTargets();
  const fileCount1 = Object.keys(pass1Hashes).length;
  process.stdout.write(`[check:deterministic] Pass 1 collected ${fileCount1} artifacts.\n`);

  // Pass 2
  runBuild(2);
  const pass2Hashes = snapshotAllTargets();
  const fileCount2 = Object.keys(pass2Hashes).length;

  let hasDiff = false;
  const allKeys = Array.from(new Set([...Object.keys(pass1Hashes), ...Object.keys(pass2Hashes)])).sort();

  for (const key of allKeys) {
    const hash1 = pass1Hashes[key];
    const hash2 = pass2Hashes[key];
    if (!hash1) {
      console.error(`FAIL: File added in pass 2: ${key}`);
      hasDiff = true;
    } else if (!hash2) {
      console.error(`FAIL: File missing in pass 2: ${key}`);
      hasDiff = true;
    } else if (hash1 !== hash2) {
      console.error(`FAIL: Sha256 mismatch for ${key}:\n  Pass 1: ${hash1}\n  Pass 2: ${hash2}`);
      hasDiff = true;
    }
  }

  if (hasDiff) {
    console.error('\n❌ Build is NOT deterministic! Artifact hashes differ between runs.\n');
    process.exit(1);
  }

  console.log(`\n✔ Build is 100% deterministic! All ${fileCount1} artifacts have identical sha256 hashes across builds.\n`);
}

main();
