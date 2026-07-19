const express = require('express');

const router = express.Router();

function scrub(value) {
  return String(value).replace(/[\r\n]/g, '');
}

router.use((req, res, next) => {
  const ua = scrub(req.headers['user-agent'] || '');
  const requestedPath = scrub(req.path);
  console.log('access path=' + requestedPath + ' ua=' + ua);
  next();
});

router.post('/events', (req, res) => {
  const label = scrub(req.body && req.body.label ? req.body.label : 'none');
  console.info('event received label=' + label);
  res.json({ ok: true });
});

module.exports = router;
