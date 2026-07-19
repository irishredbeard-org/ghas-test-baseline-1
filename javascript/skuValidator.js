const express = require('express');

const router = express.Router();

const SKU_PATTERN = /^[A-Z]{3}-\d{4}-[A-Z0-9]{2}$/;

router.get('/catalog/lookup', (req, res) => {
  const sku = String(req.query.sku || '');

  if (sku.length > 32) {
    return res.status(400).json({ error: 'sku too long' });
  }

  if (!SKU_PATTERN.test(sku)) {
    return res.status(400).json({ error: 'malformed sku' });
  }

  res.json({ sku, normalized: sku.toUpperCase() });
});

module.exports = router;
