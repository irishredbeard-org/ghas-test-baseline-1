using System;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace Profiles.Media.Web
{
    [ApiController]
    [Route("media/avatar")]
    public class AvatarProxyController : ControllerBase
    {
        private static readonly string[] AllowedHosts =
        {
            "cdn.gravatar.com",
            "avatars.example-cdn.com"
        };

        private static readonly HttpClient Client = new HttpClient();

        [HttpGet]
        public async Task<IActionResult> Proxy([FromQuery] string src)
        {
            Uri uri;
            if (!Uri.TryCreate(src, UriKind.Absolute, out uri) || uri.Scheme != Uri.UriSchemeHttps)
            {
                return BadRequest();
            }

            bool allowed = false;
            foreach (var host in AllowedHosts)
            {
                if (string.Equals(host, uri.Host, StringComparison.OrdinalIgnoreCase))
                {
                    allowed = true;
                    break;
                }
            }

            if (!allowed)
            {
                return Forbid();
            }

            byte[] bytes = await Client.GetByteArrayAsync(src);
            return File(bytes, "image/png");
        }
    }
}
