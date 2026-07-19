const { spawn } = require('child_process');
const express = require('express');

const router = express.Router();

const SERVICES = {
  billing: 'billing_db',
  identity: 'identity_db',
  catalog: 'catalog_db'
};

function runBackup(serviceKey) {
  return new Promise((resolve, reject) => {
    const dbName = SERVICES[serviceKey];
    if (!dbName) {
      return reject(new Error('unknown service'));
    }

    const child = spawn('pg_dump', ['--format=custom', '--file=/backups/' + dbName + '.dump', dbName]);
    child.on('exit', (code) => {
      if (code === 0) {
        resolve(dbName);
      } else {
        reject(new Error('backup exited ' + code));
      }
    });
  });
}

router.post('/backups/:service', async (req, res) => {
  try {
    const name = await runBackup(req.params.service);
    res.json({ backedUp: name });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

module.exports = router;
