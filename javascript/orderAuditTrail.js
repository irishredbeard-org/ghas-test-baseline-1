const winston = require('winston');

const logger = winston.createLogger({
  transports: [new winston.transports.Console()]
});

function oneLine(text) {
  return String(text).replace(/[\r\n]+/g, ' ');
}

function recordStatusChange(orderId, note, actor) {
  const safeNote = oneLine(note);
  const safeActor = oneLine(actor);
  logger.info('order ' + orderId + ' changed by ' + safeActor + ': ' + safeNote);
}

module.exports = { recordStatusChange };
