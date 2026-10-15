// A small ZIP reader and writer for .tbpack files (Plan 3.6): stored and
// deflate entries only, no ZIP64, no encryption. Written output is
// deterministic (sorted names, fixed 1980-01-01 timestamps).
import zlib from 'node:zlib';

export interface ZipEntry {
  name: string;
  data: Buffer;
}

export interface ZipLimits {
  maxEntries: number;
  maxEntryBytes: number;
  maxTotalBytes: number;
}

export const DEFAULT_ZIP_LIMITS: ZipLimits = {
  maxEntries: 512,
  maxEntryBytes: 64 * 1024 * 1024,
  maxTotalBytes: 256 * 1024 * 1024,
};

export class ZipError extends Error {}

const CRC_TABLE = (() => {
  const table = new Uint32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    table[n] = c >>> 0;
  }
  return table;
})();

export function crc32(data: Buffer): number {
  let crc = 0xffffffff;
  for (let i = 0; i < data.length; i++) crc = CRC_TABLE[(crc ^ data[i]) & 0xff] ^ (crc >>> 8);
  return (crc ^ 0xffffffff) >>> 0;
}

// DOS date 1980-01-01 00:00
const DOS_TIME = 0;
const DOS_DATE = (0 << 9) | (1 << 5) | 1;
const UTF8_FLAG = 0x0800;

export function writeZip(entries: ZipEntry[]): Buffer {
  const sorted = [...entries].sort((a, b) => (a.name < b.name ? -1 : a.name > b.name ? 1 : 0));
  const locals: Buffer[] = [];
  const centrals: Buffer[] = [];
  let offset = 0;
  for (const entry of sorted) {
    const name = Buffer.from(entry.name, 'utf8');
    const compressed = zlib.deflateRawSync(entry.data, { level: 9 });
    const useDeflate = compressed.length < entry.data.length;
    const body = useDeflate ? compressed : entry.data;
    const crc = crc32(entry.data);

    const local = Buffer.alloc(30);
    local.writeUInt32LE(0x04034b50, 0);
    local.writeUInt16LE(20, 4);
    local.writeUInt16LE(UTF8_FLAG, 6);
    local.writeUInt16LE(useDeflate ? 8 : 0, 8);
    local.writeUInt16LE(DOS_TIME, 10);
    local.writeUInt16LE(DOS_DATE, 12);
    local.writeUInt32LE(crc, 14);
    local.writeUInt32LE(body.length, 18);
    local.writeUInt32LE(entry.data.length, 22);
    local.writeUInt16LE(name.length, 26);
    local.writeUInt16LE(0, 28);
    locals.push(local, name, body);

    const central = Buffer.alloc(46);
    central.writeUInt32LE(0x02014b50, 0);
    central.writeUInt16LE((3 << 8) | 20, 4); // made by UNIX, so external attributes carry a mode
    central.writeUInt16LE(20, 6);
    central.writeUInt16LE(UTF8_FLAG, 8);
    central.writeUInt16LE(useDeflate ? 8 : 0, 10);
    central.writeUInt16LE(DOS_TIME, 12);
    central.writeUInt16LE(DOS_DATE, 14);
    central.writeUInt32LE(crc, 16);
    central.writeUInt32LE(body.length, 20);
    central.writeUInt32LE(entry.data.length, 24);
    central.writeUInt16LE(name.length, 28);
    central.writeUInt16LE(0, 30);
    central.writeUInt16LE(0, 32);
    central.writeUInt16LE(0, 34);
    central.writeUInt16LE(0, 36);
    central.writeUInt32LE((0o100644 << 16) >>> 0, 38); // regular file
    central.writeUInt32LE(offset, 42);
    centrals.push(central, name);

    offset += local.length + name.length + body.length;
  }
  const centralDir = Buffer.concat(centrals);
  const end = Buffer.alloc(22);
  end.writeUInt32LE(0x06054b50, 0);
  end.writeUInt16LE(0, 4);
  end.writeUInt16LE(0, 6);
  end.writeUInt16LE(sorted.length, 8);
  end.writeUInt16LE(sorted.length, 10);
  end.writeUInt32LE(centralDir.length, 12);
  end.writeUInt32LE(offset, 16);
  end.writeUInt16LE(0, 20);
  return Buffer.concat([...locals, centralDir, end]);
}

function findEnd(buffer: Buffer): number {
  const min = Math.max(0, buffer.length - 22 - 0xffff);
  for (let i = buffer.length - 22; i >= min; i--) {
    if (buffer.readUInt32LE(i) === 0x06054b50) return i;
  }
  throw new ZipError('Không phải file zip / not a zip file');
}

// Reads every entry, refusing what a .tbpack never contains: symlinks,
// directories, encrypted or ZIP64 entries, and anything over the limits.
export function readZip(buffer: Buffer, limits: ZipLimits = DEFAULT_ZIP_LIMITS): ZipEntry[] {
  if (buffer.length < 22) throw new ZipError('Không phải file zip / not a zip file');
  const end = findEnd(buffer);
  const count = buffer.readUInt16LE(end + 10);
  const cdSize = buffer.readUInt32LE(end + 12);
  const cdOffset = buffer.readUInt32LE(end + 16);
  if (count === 0xffff || cdOffset === 0xffffffff) throw new ZipError('ZIP64 không được hỗ trợ / ZIP64 is not supported');
  if (count > limits.maxEntries) throw new ZipError(`Quá nhiều mục (${count}) / too many entries (${count})`);
  if (cdOffset + cdSize > end) throw new ZipError('Central directory hỏng / corrupt central directory');

  const entries: ZipEntry[] = [];
  let total = 0;
  let pos = cdOffset;
  for (let i = 0; i < count; i++) {
    if (buffer.readUInt32LE(pos) !== 0x02014b50) throw new ZipError('Central directory hỏng / corrupt central directory');
    const madeBy = buffer.readUInt16LE(pos + 4) >> 8;
    const flags = buffer.readUInt16LE(pos + 8);
    const method = buffer.readUInt16LE(pos + 10);
    const crc = buffer.readUInt32LE(pos + 16);
    const compressedSize = buffer.readUInt32LE(pos + 20);
    const size = buffer.readUInt32LE(pos + 24);
    const nameLength = buffer.readUInt16LE(pos + 28);
    const extraLength = buffer.readUInt16LE(pos + 30);
    const commentLength = buffer.readUInt16LE(pos + 32);
    const external = buffer.readUInt32LE(pos + 38);
    const localOffset = buffer.readUInt32LE(pos + 42);
    const name = buffer.subarray(pos + 46, pos + 46 + nameLength).toString('utf8');
    pos += 46 + nameLength + extraLength + commentLength;

    if (flags & 0x1) throw new ZipError(`${name}: mục bị mã hóa / encrypted entry`);
    if (compressedSize === 0xffffffff || size === 0xffffffff) throw new ZipError(`${name}: ZIP64 không được hỗ trợ / ZIP64 is not supported`);
    const mode = (external >>> 16) & 0o170000;
    if (madeBy === 3 && mode === 0o120000) throw new ZipError(`${name}: symlink bị từ chối / symlinks are refused`);
    if (name.endsWith('/') || (madeBy === 3 && mode === 0o040000)) throw new ZipError(`${name}: thư mục không được phép / directory entries are refused`);
    if (size > limits.maxEntryBytes || compressedSize > limits.maxEntryBytes) {
      throw new ZipError(`${name}: vượt ${limits.maxEntryBytes} byte / exceeds ${limits.maxEntryBytes} bytes`);
    }
    total += size;
    if (total > limits.maxTotalBytes) throw new ZipError(`Gói vượt ${limits.maxTotalBytes} byte / package exceeds ${limits.maxTotalBytes} bytes`);

    if (buffer.readUInt32LE(localOffset) !== 0x04034b50) throw new ZipError(`${name}: local header hỏng / corrupt local header`);
    const dataStart = localOffset + 30 + buffer.readUInt16LE(localOffset + 26) + buffer.readUInt16LE(localOffset + 28);
    const raw = buffer.subarray(dataStart, dataStart + compressedSize);
    if (raw.length !== compressedSize) throw new ZipError(`${name}: dữ liệu bị cắt / truncated data`);
    let data: Buffer;
    if (method === 0) data = Buffer.from(raw);
    else if (method === 8) {
      try {
        data = zlib.inflateRawSync(raw, { maxOutputLength: Math.max(size, 1) });
      } catch (error: any) {
        throw new ZipError(`${name}: giải nén lỗi / cannot inflate (${error.code || error.message})`);
      }
    } else throw new ZipError(`${name}: cách nén ${method} không được hỗ trợ / compression method ${method} is not supported`);
    if (data.length !== size) throw new ZipError(`${name}: kích thước khác khai báo / size differs from the header`);
    if (crc32(data) !== crc) throw new ZipError(`${name}: sai CRC32 / CRC32 mismatch`);
    entries.push({ name, data });
  }
  return entries;
}
