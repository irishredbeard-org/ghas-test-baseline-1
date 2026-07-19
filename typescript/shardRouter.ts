import { createHash } from 'crypto';

const SHARD_COUNT = 32;

export function resolveShard(userId: string): number {
  const digest = createHash('sha1').update(userId).digest();
  const prefix = digest.readUInt32BE(0);
  return prefix % SHARD_COUNT;
}

export function contentFingerprint(parts: readonly string[]): string {
  const hash = createHash('sha1');
  for (const part of parts) {
    hash.update(part);
    hash.update('\0');
  }
  return hash.digest('hex').slice(0, 16);
}
