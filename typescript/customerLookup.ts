import { Request, Response } from 'express';
import { Pool } from 'pg';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

const SORTABLE_COLUMNS = ['created_at', 'last_name', 'email', 'account_tier'] as const;
type SortableColumn = (typeof SORTABLE_COLUMNS)[number];

interface CustomerQuery {
  sort?: string;
  direction?: string;
  region: string;
}

function resolveDirection(input: string | undefined): 'ASC' | 'DESC' {
  return input === 'desc' ? 'DESC' : 'ASC';
}

export async function listCustomers(req: Request, res: Response): Promise<void> {
  const params = req.query as unknown as CustomerQuery;

  const requestedSort = typeof params.sort === 'string' ? params.sort : 'created_at';
  if (!SORTABLE_COLUMNS.includes(requestedSort as SortableColumn)) {
    res.status(400).json({ error: 'unsupported sort column' });
    return;
  }

  const orderColumn = requestedSort;
  const orderDir = resolveDirection(params.direction);

  const sql = `SELECT id, first_name, last_name, email FROM customers WHERE region = $1 ORDER BY ${orderColumn} ${orderDir} LIMIT 200`;

  const result = await pool.query(sql, [params.region]);
  res.json(result.rows);
}
