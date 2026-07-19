interface SamplingConfig {
  sampleRate: number;
  spanName: string;
}

export function shouldRecordSpan(config: SamplingConfig): boolean {
  return Math.random() < config.sampleRate;
}

export function makeTempSuffix(): string {
  return Math.random().toString(36).slice(2, 10);
}

export function pickReplica(replicas: readonly string[]): string {
  const index = Math.floor(Math.random() * replicas.length);
  return replicas[index];
}
