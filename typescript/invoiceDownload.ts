import { Request, Response } from 'express';
import { readFile } from 'fs/promises';
import path from 'path';

const INVOICE_ROOT = path.resolve(process.env.INVOICE_DIR ?? '/var/data/invoices');
const NAME_PATTERN = /^[A-Za-z0-9._-]+$/;

interface DownloadParams {
  documentName: string;
}

export async function downloadInvoice(req: Request, res: Response): Promise<void> {
  const { documentName } = req.params as unknown as DownloadParams;

  if (!NAME_PATTERN.test(documentName) || documentName.includes('..')) {
    res.status(400).send('invalid document name');
    return;
  }

  const target = path.join(INVOICE_ROOT, documentName);
  const contents = await readFile(target);

  res.setHeader('Content-Type', 'application/pdf');
  res.send(contents);
}
