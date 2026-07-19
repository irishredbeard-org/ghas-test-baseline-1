using System.Text.RegularExpressions;
using Microsoft.Extensions.Logging;

namespace Security.Audit.Logging
{
    public class AuditTrailWriter
    {
        private static readonly Regex LineBreaks = new Regex("[\\r\\n]");
        private readonly ILogger<AuditTrailWriter> _logger;

        public AuditTrailWriter(ILogger<AuditTrailWriter> logger)
        {
            _logger = logger;
        }

        public void RecordAccess(string actor, string resource)
        {
            string cleanActor = LineBreaks.Replace(actor, "");
            string cleanResource = LineBreaks.Replace(resource, "");

            _logger.LogInformation("Access granted actor={Actor} resource={Resource}",
                cleanActor, cleanResource);
        }
    }
}
