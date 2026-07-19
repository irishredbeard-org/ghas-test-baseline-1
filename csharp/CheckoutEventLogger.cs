using System.Text.RegularExpressions;
using Microsoft.Extensions.Logging;

namespace Commerce.Checkout.Diagnostics
{
    public class CheckoutEventLogger
    {
        private readonly ILogger<CheckoutEventLogger> _logger;

        public CheckoutEventLogger(ILogger<CheckoutEventLogger> logger)
        {
            _logger = logger;
        }

        public void CouponApplied(string cartId, string couponCode)
        {
            string cart = Regex.Replace(cartId, "[\\r\\n\\t]", "");
            string coupon = Regex.Replace(couponCode, "[\\r\\n\\t]", "");

            _logger.LogInformation("Coupon applied cart={Cart} coupon={Coupon}", cart, coupon);
        }
    }
}
