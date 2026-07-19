import { createReadStream } from 'fs';
import { stat } from 'fs/promises';
import path from 'path';
import { Request, Response } from 'express';

const BUNDLE_BASE = path.resolve('/opt/firmware/releases');

interface BundleQuery {
  channel: string;
  build: string;
}

function isSegmentAllowed(segment: string): boolean {
  return /^[a-z0-9]+(?:[.-][a-z0-9]+)*$/.test(segment);
}

export async function streamFirmwareBundle(req: Request, res: Response): Promise<void> {
  const query = req.query as unknown as BundleQuery;

  if (!isSegmentAllowed(query.channel) || !isSegmentAllowed(query.build)) {
    res.status(400).send('malformed bundle coordinates');
    return;
  }

  const bundlePath = path.join(BUNDLE_BASE, query.channel, `${query.build}.bin`);

  const info = await stat(bundlePath);
  res.setHeader('Content-Length', info.size);
  createReadStream(bundlePath).pipe(res);
}
