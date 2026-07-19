import { execFile } from 'child_process';
import { promisify } from 'util';

const run = promisify(execFile);

interface TranscodeJob {
  inputPath: string;
  profile: string;
}

const PROFILE_ARGS: Record<string, string[]> = {
  web720: ['-vf', 'scale=-2:720', '-c:v', 'libx264', '-crf', '23'],
  web1080: ['-vf', 'scale=-2:1080', '-c:v', 'libx264', '-crf', '20'],
  audioOnly: ['-vn', '-c:a', 'aac', '-b:a', '128k'],
  thumbnail: ['-frames:v', '1', '-q:v', '2'],
};

export async function transcodeAsset(job: TranscodeJob): Promise<string> {
  const args = PROFILE_ARGS[job.profile];
  if (!args) {
    throw new Error(`unsupported profile: ${job.profile}`);
  }

  const outputPath = `${job.inputPath}.${job.profile}.out`;
  const fullArgs = ['-y', '-i', job.inputPath, ...args, outputPath];

  await run('ffmpeg', fullArgs);
  return outputPath;
}
