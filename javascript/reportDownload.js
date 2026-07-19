const express = require('express');
const path = require('path');
const fs = require('fs');

const router = express.Router();
const REPORT_ROOT = path.resolve(__dirname, 'generated', 'reports');

const FILE_PATTERN = /^[A-Za-z0-9._-]+$/;

router.get('/download/report', (req, res) => {
  const file = String(req.query.file || '');

  if (!FILE_PATTERN.test(file)) {
    return res.status(400).send('invalid file');
  }
  if (file.includes('..') || file.startsWith('/')) {
    return res.status(400).send('invalid file');
  }

  const fullPath = path.join(REPORT_ROOT, file);

  fs.stat(fullPath, (err, stats) => {
    if (err || !stats.isFile()) {
      return res.status(404).send('report not found');
    }
    res.download(fullPath);
  });
});

module.exports = router;
