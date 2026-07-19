using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;

namespace Portal.Search.Web
{
    [ApiController]
    [Route("search")]
    public class SearchResultsController : ControllerBase
    {
        private static readonly Dictionary<string, string> CategoryLabels = new Dictionary<string, string>
        {
            ["docs"] = "Documentation",
            ["forum"] = "Community Forum",
            ["kb"] = "Knowledge Base",
            ["blog"] = "Engineering Blog"
        };

        [HttpGet("heading")]
        [Produces("text/html")]
        public ContentResult Heading([FromQuery] string category)
        {
            string label = CategoryLabels.TryGetValue(category, out var value)
                ? value
                : "All Results";

            string html = "<h1>" + label + "</h1>";

            return new ContentResult
            {
                ContentType = "text/html",
                Content = html
            };
        }
    }
}
