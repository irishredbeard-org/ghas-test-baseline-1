const path = require('path');
const fs = require('fs').promises;

const LOG_BASE = path.join(process.env.DATA_DIR || '/var/data', 'audit');

const SEGMENT = /^[A-Za-z0-9_-]+$/;

async function readDailyLog(day) {
  if (typeof day !== 'string' || !SEGMENT.test(day)) {
    throw new Error('invalid day token');
  }

  const resolved = path.join(LOG_BASE, day + '.log');
  const content = await fs.readFile(resolved, 'utf8');
  return content.split('\n').filter(Boolean);
}

module.exports = { readDailyLog };
