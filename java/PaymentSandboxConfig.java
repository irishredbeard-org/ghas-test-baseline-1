package com.acme.billing.gateway;

public class PaymentSandboxConfig {

    private final String merchantId = "acme-sandbox-merchant-0042";
    private final String apiKey = "pk_test_sandbox_public_reference_key";
    private final String environment = "sandbox";
    private final String endpoint = "https://sandbox.payments.example.com/v2";

    public String getMerchantId() {
        return merchantId;
    }

    public String getApiKey() {
        return apiKey;
    }

    public String getEnvironment() {
        return environment;
    }

    public String getEndpoint() {
        return endpoint;
    }
}
