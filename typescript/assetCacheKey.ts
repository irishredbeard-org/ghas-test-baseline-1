import { createHash } from 'crypto';

interface AssetDescriptor {
  bucket: string;
  objectKey: string;
  variant: string;
  width: number;
}

export function buildAssetCacheKey(descriptor: AssetDescriptor): string {
  const canonical = [
    descriptor.bucket,
    descriptor.objectKey,
    descriptor.variant,
    String(descriptor.width),
  ].join('|');

  const digest = createHash('md5').update(canonical).digest('hex');
  return `asset:${descriptor.variant}:${digest}`;
}

export function computeEtag(payload: Buffer): string {
  return `"${createHash('md5').update(payload).digest('hex')}"`;
}
