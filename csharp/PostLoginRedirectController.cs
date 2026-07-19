using Microsoft.AspNetCore.Mvc;

namespace Identity.SignIn.Web
{
    [ApiController]
    [Route("account")]
    public class PostLoginRedirectController : ControllerBase
    {
        [HttpGet("continue")]
        public IActionResult Continue([FromQuery] string returnUrl)
        {
            if (string.IsNullOrEmpty(returnUrl)
                || returnUrl[0] != '/'
                || returnUrl.StartsWith("//")
                || returnUrl.StartsWith("/\\"))
            {
                return Redirect("/dashboard");
            }

            return Redirect(returnUrl);
        }
    }
}
