using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;

namespace Marketing.Campaigns.Web
{
    [ApiController]
    [Route("go")]
    public class CampaignLinkController : ControllerBase
    {
        private static readonly Dictionary<string, string> Destinations = new Dictionary<string, string>
        {
            ["pricing"] = "https://www.example.com/pricing",
            ["signup"] = "https://app.example.com/signup",
            ["docs"] = "https://docs.example.com",
            ["status"] = "https://status.example.com"
        };

        [HttpGet("{slug}")]
        public IActionResult Follow(string slug)
        {
            if (!Destinations.TryGetValue(slug, out var target))
            {
                return NotFound();
            }

            return Redirect(target);
        }
    }
}
