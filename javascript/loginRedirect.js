const express = require('express');

const router = express.Router();

function isLocalPath(target) {
  return typeof target === 'string'
    && target.startsWith('/')
    && !target.startsWith('//')
    && !target.startsWith('/\\');
}

router.get('/login/complete', (req, res) => {
  const next = req.query.next;

  if (isLocalPath(next)) {
    return res.redirect(next);
  }

  res.redirect('/dashboard');
});

module.exports = router;
