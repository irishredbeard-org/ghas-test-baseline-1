import { Request, Response } from 'express';

const STATUS_LABELS: Record<string, string> = {
  operational: 'All systems operational',
  degraded: 'Partial degradation',
  maintenance: 'Scheduled maintenance',
  outage: 'Major outage',
};

const STATUS_COLORS: Record<string, string> = {
  operational: '#2ecc71',
  degraded: '#f1c40f',
  maintenance: '#3498db',
  outage: '#e74c3c',
};

export function renderStatusBadge(req: Request, res: Response): void {
  const requested = String(req.query.state ?? 'operational');
  const label = STATUS_LABELS[requested] ?? STATUS_LABELS.operational;
  const color = STATUS_COLORS[requested] ?? STATUS_COLORS.operational;

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="220" height="32"><rect width="220" height="32" fill="${color}"/><text x="12" y="21" fill="#fff" font-family="sans-serif" font-size="13">${label}</text></svg>`;

  res.setHeader('Content-Type', 'image/svg+xml');
  res.send(svg);
}
