using System.Net;
using System.Text;
using Microsoft.AspNetCore.Mvc;

namespace Commerce.Orders.Web
{
    [ApiController]
    [Route("orders")]
    public class OrderStatusBannerController : ControllerBase
    {
        [HttpGet("banner")]
        [Produces("text/html")]
        public ContentResult Banner([FromQuery] string reference)
        {
            string encoded = WebUtility.HtmlEncode(reference);

            var html = new StringBuilder();
            html.Append("<div class=\"order-banner\">");
            html.Append("<span>Tracking order ");
            html.Append(encoded);
            html.Append("</span></div>");

            return new ContentResult
            {
                ContentType = "text/html",
                Content = html.ToString()
            };
        }
    }
}
