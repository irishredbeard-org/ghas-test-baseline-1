const axios = require('axios');
const { URL } = require('url');

const APPROVED_HOSTS = new Set([
  'hooks.internal.example.com',
  'events.partner.example.net',
  'ingest.analytics.example.io'
]);

async function forwardEvent(rawUrl, payload) {
  let parsed;
  try {
    parsed = new URL(rawUrl);
  } catch (e) {
    throw new Error('invalid url');
  }

  if (parsed.protocol !== 'https:' || !APPROVED_HOSTS.has(parsed.hostname)) {
    throw new Error('host not allowed');
  }

  const resp = await axios.post(rawUrl, payload, { timeout: 5000 });
  return resp.status;
}

module.exports = { forwardEvent, APPROVED_HOSTS };
