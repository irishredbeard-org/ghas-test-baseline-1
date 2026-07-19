import { execFile } from 'child_process';
import { Request, Response } from 'express';

interface MaintenanceRequest {
  action: string;
  nodeGroup: string;
}

const ACTIONS = ['drain', 'cordon', 'uncordon', 'status'] as const;
type Action = (typeof ACTIONS)[number];

const NODE_GROUPS = new Map<string, string>([
  ['ingest', 'nodegroup/ingest-pool'],
  ['compute', 'nodegroup/compute-pool'],
  ['edge', 'nodegroup/edge-pool'],
]);

export function performMaintenance(req: Request, res: Response): void {
  const body = req.body as MaintenanceRequest;

  if (!ACTIONS.includes(body.action as Action)) {
    res.status(400).send('unknown action');
    return;
  }

  const target = NODE_GROUPS.get(body.nodeGroup);
  if (!target) {
    res.status(400).send('unknown node group');
    return;
  }

  execFile('clusterctl', [body.action, target, '--wait'], (err, stdout) => {
    if (err) {
      res.status(500).send('maintenance command failed');
      return;
    }
    res.send(stdout);
  });
}
