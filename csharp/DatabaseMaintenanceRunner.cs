using System.Collections.Generic;
using System.Diagnostics;

namespace Operations.Maintenance.Jobs
{
    public class DatabaseMaintenanceRunner
    {
        private static readonly Dictionary<string, string> Commands = new Dictionary<string, string>
        {
            ["vacuum"] = "vacuumdb",
            ["reindex"] = "reindexdb",
            ["analyze"] = "vacuumdb"
        };

        public string RunTask(string taskName, string databaseName)
        {
            if (!Commands.TryGetValue(taskName, out var executable))
            {
                return "unknown task";
            }

            var psi = new ProcessStartInfo
            {
                FileName = "/usr/bin/" + executable,
                RedirectStandardOutput = true,
                UseShellExecute = false
            };

            psi.ArgumentList.Add("--host=db.internal");
            psi.ArgumentList.Add("--dbname");
            psi.ArgumentList.Add(databaseName);
            if (taskName == "analyze")
            {
                psi.ArgumentList.Add("--analyze-only");
            }

            using (var process = Process.Start(psi))
            {
                string output = process.StandardOutput.ReadToEnd();
                process.WaitForExit();
                return output;
            }
        }
    }
}
