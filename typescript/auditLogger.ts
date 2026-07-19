import { Request } from 'express';

interface AuditEvent {
  actor: string;
  action: string;
  resource: string;
}

const logger = {
  info(message: string): void {
    process.stdout.write(`${new Date().toISOString()} ${message}\n`);
  },
};

function oneLine(value: string): string {
  return value.replace(/[\r\n]/g, '');
}

export function recordAudit(req: Request, event: AuditEvent): void {
  const actor = oneLine(event.actor);
  const action = oneLine(event.action);
  const resource = oneLine(event.resource);
  const agent = oneLine(String(req.headers['user-agent'] ?? 'unknown'));

  logger.info(`audit actor=${actor} action=${action} resource=${resource} ua=${agent}`);
}
