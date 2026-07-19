const express = require('express');

const router = express.Router();

const EXPRESSION_PATTERN = /^[0-9+\-*/().\s]+$/;

function evaluate(expr) {
  if (!EXPRESSION_PATTERN.test(expr)) {
    throw new Error('unsupported expression');
  }
  const fn = new Function('return (' + expr + ');');
  return fn();
}

router.post('/calc', (req, res) => {
  const expr = String(req.body && req.body.expr ? req.body.expr : '');
  try {
    res.json({ result: evaluate(expr) });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

module.exports = router;
