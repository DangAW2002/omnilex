import fs from 'node:fs';
import path from 'node:path';

const distDir = path.resolve(process.cwd(), '../../dist');

export function readDist(relPath: string): string {
  return fs.readFileSync(path.join(distDir, ...relPath.split('/')), 'utf-8');
}

export function readManifest(): any {
  return JSON.parse(readDist('manifest.json'));
}
