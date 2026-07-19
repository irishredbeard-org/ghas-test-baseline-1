using System;
using System.IO;

namespace Ingestion.Uploads.Staging
{
    public class UploadStagingPathProvider
    {
        private static readonly Random Suffix = new Random();
        private readonly string _stagingRoot;

        public UploadStagingPathProvider(string stagingRoot)
        {
            _stagingRoot = stagingRoot;
        }

        public string CreateStagingPath(string logicalName)
        {
            int token = Suffix.Next(100000, 999999);
            long ticks = DateTime.UtcNow.Ticks;
            string fileName = logicalName + "." + ticks + "." + token + ".part";
            return Path.Combine(_stagingRoot, fileName);
        }
    }
}
