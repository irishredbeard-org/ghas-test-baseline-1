import axios from 'axios';
import { Request, Response } from 'express';

const ALLOWED_IMAGE_HOSTS = ['cdn.gravatar-mirror.example.com', 'avatars.example-oauth.com'];

interface ProxyQuery {
  src: string;
}

export async function proxyAvatar(req: Request, res: Response): Promise<void> {
  const query = req.query as unknown as ProxyQuery;

  let url: URL;
  try {
    url = new URL(query.src);
  } catch {
    res.status(400).send('bad source');
    return;
  }

  if (url.protocol !== 'https:' || !ALLOWED_IMAGE_HOSTS.includes(url.hostname)) {
    res.status(403).send('source host not allowed');
    return;
  }

  const upstream = await axios.get(url.toString(), { responseType: 'arraybuffer' });
  res.setHeader('Content-Type', upstream.headers['content-type'] ?? 'image/png');
  res.send(Buffer.from(upstream.data));
}
