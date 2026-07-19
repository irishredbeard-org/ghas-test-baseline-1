import { Request, Response } from 'express';

const VERSION_RE = /^(\d+)(\.\d+)+(-[A-Za-z0-9]+(\.[A-Za-z0-9]+)*)?$/;

interface VersionQuery {
  v: string;
}

export function parseVersion(req: Request, res: Response): void {
  const query = req.query as unknown as VersionQuery;
  const raw = query.v;

  if (typeof raw !== 'string' || raw.length > 32) {
    res.status(400).json({ error: 'version string too long' });
    return;
  }

  const match = VERSION_RE.exec(raw);
  if (!match) {
    res.status(422).json({ error: 'unparseable version' });
    return;
  }

  res.json({ major: Number(match[1]), original: raw });
}
