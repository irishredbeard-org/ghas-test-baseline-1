import { Request, Response } from 'express';

interface LoginState {
  returnTo?: string;
}

function toInternalPath(candidate: string | undefined): string {
  if (!candidate) {
    return '/dashboard';
  }
  if (candidate.startsWith('/') && !candidate.startsWith('//') && !candidate.startsWith('/\\')) {
    return candidate;
  }
  return '/dashboard';
}

export function completeLogin(req: Request, res: Response): void {
  const state = req.query as unknown as LoginState;
  const destination = toInternalPath(state.returnTo);
  res.redirect(destination);
}
