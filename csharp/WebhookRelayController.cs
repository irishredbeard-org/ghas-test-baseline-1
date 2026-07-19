using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace Integrations.Webhooks.Web
{
    [ApiController]
    [Route("api/relay")]
    public class WebhookRelayController : ControllerBase
    {
        private static readonly HashSet<string> ApprovedHosts = new HashSet<string>(StringComparer.OrdinalIgnoreCase)
        {
            "hooks.partner-a.com",
            "events.partner-b.io",
            "ingest.partner-c.net"
        };

        private static readonly HttpClient Client = new HttpClient();

        [HttpPost("fetch")]
        public async Task<IActionResult> Fetch([FromQuery] string url)
        {
            Uri parsed;
            if (!Uri.TryCreate(url, UriKind.Absolute, out parsed))
            {
                return BadRequest("Invalid URL");
            }

            if (!ApprovedHosts.Contains(parsed.Host))
            {
                return StatusCode(403, "Host not permitted");
            }

            HttpResponseMessage response = await Client.GetAsync(url);
            string body = await response.Content.ReadAsStringAsync();

            return Content(body);
        }
    }
}
