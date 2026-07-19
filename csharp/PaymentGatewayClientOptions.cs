namespace Payments.Gateway.Configuration
{
    public class PaymentGatewayClientOptions
    {
        public string SandboxBaseUrl { get; set; } = "https://sandbox.gateway.example.com";

        public string ClientId { get; set; } = "pgw-sandbox-6f2a1c";

        public string ApiKey { get; set; } = "sandbox-public-key-0000";

        public string MerchantReference { get; set; } = "demo-merchant-001";

        public int TimeoutSeconds { get; set; } = 30;
    }
}
