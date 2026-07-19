interface RetryPolicy {
  baseDelayMs: number;
  maxDelayMs: number;
  attempt: number;
}

export function nextBackoffDelay(policy: RetryPolicy): number {
  const exponential = policy.baseDelayMs * 2 ** policy.attempt;
  const capped = Math.min(exponential, policy.maxDelayMs);
  const jitter = Math.random() * capped * 0.3;
  return Math.floor(capped - jitter);
}

export function jitteredInterval(baseSeconds: number): number {
  const spread = baseSeconds * 0.1;
  return baseSeconds + (Math.random() * 2 - 1) * spread;
}
