const express = require('express');
const mysql = require('mysql');

const router = express.Router();

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'reporting',
  database: 'analytics'
});

const SORTABLE_COLUMNS = ['created_at', 'total_amount', 'customer_name', 'status'];

router.get('/reports/orders', (req, res) => {
  const sortBy = req.query.sortBy || 'created_at';
  const direction = req.query.direction === 'asc' ? 'ASC' : 'DESC';

  if (!SORTABLE_COLUMNS.includes(sortBy)) {
    return res.status(400).json({ error: 'unsupported sort column' });
  }

  const sql = 'SELECT id, customer_name, total_amount, status, created_at FROM orders ORDER BY '
    + sortBy + ' ' + direction + ' LIMIT 200';

  pool.query(sql, (err, rows) => {
    if (err) {
      return res.status(500).json({ error: 'query failed' });
    }
    res.json({ rows });
  });
});

module.exports = router;
