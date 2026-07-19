const express = require('express');
const axios = require('axios');
const { URL } = require('url');

const router = express.Router();

const ALLOWED_CDN = ['cdn.example.com', 'images.example.com', 'static.example.org'];

router.get('/proxy/image', async (req, res) => {
  const raw = String(req.query.src || '');
  let u;
  try {
    u = new URL(raw);
  } catch (e) {
    return res.status(400).send('bad url');
  }

  if (!ALLOWED_CDN.includes(u.hostname)) {
    return res.status(403).send('host not permitted');
  }

  try {
    const upstream = await axios.get(raw, { responseType: 'arraybuffer', timeout: 4000 });
    res.type(upstream.headers['content-type'] || 'image/jpeg').send(upstream.data);
  } catch (e) {
    res.status(502).send('fetch failed');
  }
});

module.exports = router;
