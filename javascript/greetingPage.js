const express = require('express');

const router = express.Router();

function escapeHtml(input) {
  return String(input).replace(/[&<>"']/g, (c) => {
    switch (c) {
      case '&': return '&amp;';
      case '<': return '&lt;';
      case '>': return '&gt;';
      case '"': return '&quot;';
      default: return '&#39;';
    }
  });
}

router.get('/hello', (req, res) => {
  const name = escapeHtml(req.query.name || 'guest');
  res.type('html').send('<html><body><h1>Hello, ' + name + '</h1></body></html>');
});

module.exports = router;
