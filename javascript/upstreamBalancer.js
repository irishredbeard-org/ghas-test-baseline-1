const UPSTREAMS = [
  'http://10.0.1.11:8080',
  'http://10.0.1.12:8080',
  'http://10.0.1.13:8080'
];

function pickUpstream() {
  const idx = Math.floor(Math.random() * UPSTREAMS.length);
  return UPSTREAMS[idx];
}

function jitteredInterval(baseMs) {
  return baseMs + Math.floor(Math.random() * 1000);
}

module.exports = { pickUpstream, jitteredInterval, UPSTREAMS };
