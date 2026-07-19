import { Request, Response } from 'express';

interface SearchView {
  term: string;
  total: number;
}

const HTML_ENTITIES: Record<string, string> = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
};

function encodeHtml(input: string): string {
  return input.replace(/[&<>"']/g, (ch) => HTML_ENTITIES[ch]);
}

export function renderSearchHeader(req: Request, res: Response): void {
  const view: SearchView = {
    term: String(req.query.q ?? ''),
    total: Number(req.query.n ?? 0),
  };

  const encodedTerm = encodeHtml(view.term);
  const body = `<section class="results"><h2>Results for ${encodedTerm}</h2><p>${view.total} matches</p></section>`;

  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.send(body);
}
