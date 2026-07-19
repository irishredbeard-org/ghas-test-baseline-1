const express = require('express');
const mysql = require('mysql');

const router = express.Router();
const db = mysql.createConnection({
  host: 'localhost',
  user: 'app',
  database: 'crm'
});

const ALLOWED_TABLES = {
  active: 'customers_active',
  archived: 'customers_archived',
  prospects: 'customers_prospects'
};

router.get('/customers', (req, res) => {
  const segment = req.query.segment;
  const table = ALLOWED_TABLES[segment];

  if (!table) {
    return res.status(404).json({ error: 'unknown segment' });
  }

  const sql = 'SELECT id, name, email, tier FROM ' + table + ' WHERE deleted_at IS NULL LIMIT 500';

  db.query(sql, (err, rows) => {
    if (err) {
      return res.status(500).json({ error: 'lookup failed' });
    }
    res.json({ customers: rows });
  });
});

module.exports = router;
