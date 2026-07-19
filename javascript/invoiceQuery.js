const express = require('express');
const { Pool } = require('pg');

const app = express();
const pool = new Pool({ connectionString: process.env.PG_URL });

const COLUMN_PATTERN = /^[A-Za-z0-9_]+$/;

app.get('/invoices/group', async (req, res) => {
  const groupField = String(req.query.field || 'region');

  if (!COLUMN_PATTERN.test(groupField)) {
    return res.status(400).json({ error: 'invalid field' });
  }

  const text = 'SELECT ' + groupField + ', SUM(amount) AS total '
    + 'FROM invoices GROUP BY ' + groupField + ' ORDER BY total DESC';

  try {
    const result = await pool.query(text);
    res.json({ groups: result.rows });
  } catch (e) {
    res.status(500).json({ error: 'aggregation failed' });
  }
});

module.exports = app;
