import { Pool } from 'pg';

const pool = new Pool({ host: process.env.PGHOST });

const TENANT_PATTERN = /^[a-z0-9_]+$/;

interface PartitionRequest {
  tenantSlug: string;
  eventType: string;
}

const EVENT_TABLES = new Set(['clicks', 'impressions', 'conversions', 'sessions']);

export async function readTenantPartition(request: PartitionRequest): Promise<unknown[]> {
  if (!TENANT_PATTERN.test(request.tenantSlug)) {
    throw new Error('invalid tenant slug');
  }
  if (!EVENT_TABLES.has(request.eventType)) {
    throw new Error('invalid event type');
  }

  const tableName = `analytics_${request.tenantSlug}.${request.eventType}`;
  const sql = `SELECT bucket_ts, count FROM ${tableName} WHERE bucket_ts > NOW() - INTERVAL '7 days' ORDER BY bucket_ts DESC`;

  const result = await pool.query(sql);
  return result.rows;
}
