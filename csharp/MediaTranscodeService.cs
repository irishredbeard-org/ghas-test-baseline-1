using System.Collections.Generic;
using System.Diagnostics;

namespace Media.Pipeline.Encoding
{
    public class MediaTranscodeService
    {
        private static readonly Dictionary<string, string[]> Profiles = new Dictionary<string, string[]>
        {
            ["web-720p"] = new[] { "-vf", "scale=-2:720", "-c:v", "libx264", "-preset", "fast" },
            ["web-1080p"] = new[] { "-vf", "scale=-2:1080", "-c:v", "libx264", "-preset", "medium" },
            ["audio-only"] = new[] { "-vn", "-c:a", "aac", "-b:a", "128k" }
        };

        public int Transcode(string inputPath, string outputPath, string profileName)
        {
            if (!Profiles.TryGetValue(profileName, out var args))
            {
                return -1;
            }

            var psi = new ProcessStartInfo
            {
                FileName = "/usr/bin/ffmpeg",
                RedirectStandardError = true,
                UseShellExecute = false
            };

            psi.ArgumentList.Add("-i");
            psi.ArgumentList.Add(inputPath);
            foreach (var arg in args)
            {
                psi.ArgumentList.Add(arg);
            }
            psi.ArgumentList.Add(outputPath);

            using (var process = Process.Start(psi))
            {
                process.WaitForExit();
                return process.ExitCode;
            }
        }
    }
}
