// Minimal semver for pack `requires`: exact, ^, ~, >=, >, <=, <, x/* and
// space-separated intersections. Pre-release tags compare below the release.

export interface Version {
  major: number;
  minor: number;
  patch: number;
  pre: string;
}

export function parseVersion(value: string): Version | null {
  const match = /^v?(\d+)\.(\d+)\.(\d+)(?:-([0-9A-Za-z.-]+))?(?:\+[0-9A-Za-z.-]+)?$/.exec(value.trim());
  if (!match) return null;
  return { major: +match[1], minor: +match[2], patch: +match[3], pre: match[4] || '' };
}

export function compareVersions(a: Version, b: Version): number {
  if (a.major !== b.major) return a.major - b.major;
  if (a.minor !== b.minor) return a.minor - b.minor;
  if (a.patch !== b.patch) return a.patch - b.patch;
  if (a.pre === b.pre) return 0;
  if (!a.pre) return 1;
  if (!b.pre) return -1;
  return a.pre < b.pre ? -1 : 1;
}

// "1", "1.2", "1.x", "1.2.*" -> lower bound plus how many parts were given.
function partial(value: string): { version: Version; parts: number } | null {
  const pieces = value.replace(/^v/, '').split('-')[0].split('.');
  const nums: number[] = [];
  for (const piece of pieces) {
    if (piece === 'x' || piece === 'X' || piece === '*') break;
    if (!/^\d+$/.test(piece)) return null;
    nums.push(+piece);
  }
  if (nums.length === 0 && pieces[0] !== '*' && pieces[0] !== 'x' && pieces[0] !== 'X') return null;
  const pre = nums.length === 3 && value.includes('-') ? value.slice(value.indexOf('-') + 1) : '';
  return { version: { major: nums[0] || 0, minor: nums[1] || 0, patch: nums[2] || 0, pre }, parts: nums.length };
}

type Bound = { op: '>=' | '<' | '>' | '<='; version: Version };

function bump(version: Version, part: 'major' | 'minor' | 'patch'): Version {
  if (part === 'major') return { major: version.major + 1, minor: 0, patch: 0, pre: '' };
  if (part === 'minor') return { major: version.major, minor: version.minor + 1, patch: 0, pre: '' };
  return { major: version.major, minor: version.minor, patch: version.patch + 1, pre: '' };
}

function comparatorBounds(token: string): Bound[] | null {
  if (token === '*' || token === 'x' || token === 'X' || token === '') return [];
  const op = /^(\^|~|>=|<=|>|<|=)?(.*)$/.exec(token)!;
  const p = partial(op[2]);
  if (!p) return null;
  const { version, parts } = p;
  switch (op[1]) {
    case '^': {
      const upper = version.major > 0 || parts <= 1
        ? bump(version, 'major')
        : version.minor > 0 || parts <= 2
        ? bump(version, 'minor')
        : bump(version, 'patch');
      return [{ op: '>=', version }, { op: '<', version: upper }];
    }
    case '~':
      return [{ op: '>=', version }, { op: '<', version: parts <= 1 ? bump(version, 'major') : bump(version, 'minor') }];
    case '>=':
    case '>':
    case '<=':
    case '<':
      return [{ op: op[1], version }];
    default:
      if (parts === 3) return [{ op: '>=', version }, { op: '<=', version }];
      return [{ op: '>=', version }, { op: '<', version: parts === 0 ? bump(version, 'major') : bump(version, parts === 1 ? 'major' : 'minor') }];
  }
}

export function satisfies(version: string, range: string): boolean {
  const parsed = parseVersion(version);
  if (!parsed) return false;
  return range.split('||').some((alternative) => {
    const tokens = alternative.trim().split(/\s+/).filter(Boolean);
    const bounds: Bound[] = [];
    for (const token of tokens.length ? tokens : ['*']) {
      const b = comparatorBounds(token);
      if (!b) return false;
      bounds.push(...b);
    }
    return bounds.every(({ op, version: bound }) => {
      const cmp = compareVersions(parsed, bound);
      return op === '>=' ? cmp >= 0 : op === '>' ? cmp > 0 : op === '<=' ? cmp <= 0 : cmp < 0;
    });
  });
}

export function maxSatisfying(versions: string[], range: string): string | null {
  let best: { raw: string; version: Version } | null = null;
  for (const raw of versions) {
    const version = parseVersion(raw);
    if (!version || !satisfies(raw, range)) continue;
    if (!best || compareVersions(version, best.version) > 0) best = { raw, version };
  }
  return best?.raw ?? null;
}
