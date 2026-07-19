const express = require('express');
const { execFile } = require('child_process');
const path = require('path');

const router = express.Router();

const PRESETS = {
  small: ['-resize', '120x120'],
  medium: ['-resize', '320x320'],
  large: ['-resize', '800x800']
};

const SOURCE_DIR = path.join(__dirname, 'uploads');
const OUT_DIR = path.join(__dirname, 'thumbs');

router.post('/thumbnails/:preset', (req, res) => {
  const preset = req.params.preset;
  const args = PRESETS[preset];

  if (!args) {
    return res.status(400).json({ error: 'unknown preset' });
  }

  const src = path.join(SOURCE_DIR, 'input.png');
  const out = path.join(OUT_DIR, preset + '.png');

  execFile('convert', [src].concat(args).concat([out]), (err) => {
    if (err) {
      return res.status(500).json({ error: 'thumbnail failed' });
    }
    res.json({ ok: true, preset });
  });
});

module.exports = router;
