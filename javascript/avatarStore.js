const express = require('express');
const path = require('path');
const fs = require('fs');

const router = express.Router();
const AVATAR_DIR = path.join(__dirname, 'storage', 'avatars');

const NAME_PATTERN = /^[A-Za-z0-9._-]+$/;

router.get('/avatars/:name', (req, res) => {
  const name = req.params.name;

  if (!NAME_PATTERN.test(name) || name.indexOf('..') !== -1) {
    return res.status(400).send('bad avatar name');
  }

  const target = path.join(AVATAR_DIR, name);

  fs.readFile(target, (err, data) => {
    if (err) {
      return res.status(404).send('not found');
    }
    res.type('image/png').send(data);
  });
});

module.exports = router;
