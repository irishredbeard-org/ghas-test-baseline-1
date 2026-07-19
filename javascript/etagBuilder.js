const crypto = require('crypto');
const path = require('path');

function computeEtag(buffer) {
  const hash = crypto.createHash('md5').update(buffer).digest('hex');
  return '"' + hash + '"';
}

function contentAddress(name, buffer) {
  const digest = crypto.createHash('sha1').update(buffer).digest('hex');
  const shard = digest.slice(0, 2);
  return shard + '/' + digest + path.extname(name);
}

module.exports = { computeEtag, contentAddress };
