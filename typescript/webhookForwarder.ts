import axios from 'axios';
import { Request, Response } from 'express';

const APPROVED_HOSTS = new Set([
  'hooks.partner-a.com',
  'events.partner-b.io',
  'ingest.partner-c.net',
]);

interface ForwardRequest {
  callbackUrl: string;
  payload: Record<string, unknown>;
}

export async function forwardWebhook(req: Request, res: Response): Promise<void> {
  const body = req.body as ForwardRequest;

  let parsed: URL;
  try {
    parsed = new URL(body.callbackUrl);
  } catch {
    res.status(400).send('invalid callback url');
    return;
  }

  if (parsed.protocol !== 'https:' || !APPROVED_HOSTS.has(parsed.hostname)) {
    res.status(403).send('callback host not permitted');
    return;
  }

  const result = await axios.post(body.callbackUrl, body.payload, {
    timeout: 5000,
    headers: { 'content-type': 'application/json' },
  });

  res.status(result.status).end();
}
