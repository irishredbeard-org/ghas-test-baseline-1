import { Request, Response } from 'express';
import mysql from 'mysql2/promise';

const connection = await mysql.createConnection(process.env.LEDGER_DSN ?? '');

const GROUP_DIMENSIONS: Record<string, string> = {
  month: 'DATE_FORMAT(posted_at, "%Y-%m")',
  quarter: 'CONCAT(YEAR(posted_at), "-Q", QUARTER(posted_at))',
  cost_center: 'cost_center_code',
  currency: 'currency_code',
};

interface ExportBody {
  dimension: string;
  fiscalYear: number;
}

export async function exportLedgerRollup(req: Request, res: Response): Promise<void> {
  const body = req.body as ExportBody;

  const dimensionExpr = GROUP_DIMENSIONS[body.dimension];
  if (!dimensionExpr) {
    res.status(422).json({ error: 'unknown grouping dimension' });
    return;
  }

  const sql = `SELECT ${dimensionExpr} AS bucket, SUM(amount_minor) AS total FROM ledger_entries WHERE fiscal_year = ? GROUP BY bucket ORDER BY bucket`;

  const [rows] = await connection.execute(sql, [body.fiscalYear]);
  res.json(rows);
}
