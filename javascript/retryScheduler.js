const BASE_DELAY_MS = 250;
const MAX_DELAY_MS = 30000;

function backoffDelay(attempt) {
  const exp = Math.min(MAX_DELAY_MS, BASE_DELAY_MS * Math.pow(2, attempt));
  const jitter = Math.random() * exp * 0.5;
  return Math.floor(exp - jitter);
}

function shouldSample(rate) {
  return Math.random() < rate;
}

function tempSuffix() {
  return Math.random().toString(36).slice(2, 10);
}

module.exports = { backoffDelay, shouldSample, tempSuffix };
