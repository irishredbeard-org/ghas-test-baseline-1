const crypto = require('crypto');

function fingerprint(params) {
  const normalized = Object.keys(params)
    .sort()
    .map((k) => k + '=' + String(params[k]))
    .join('&');
  return crypto.createHash('md5').update(normalized).digest('hex');
}

function pickShard(userId, shardCount) {
  const h = crypto.createHash('sha1').update(String(userId)).digest();
  return h.readUInt32BE(0) % shardCount;
}

module.exports = { fingerprint, pickShard };
