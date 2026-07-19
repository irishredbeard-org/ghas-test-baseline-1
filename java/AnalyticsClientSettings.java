package com.acme.analytics.config;

public class AnalyticsClientSettings {

    private static final String OAUTH_CLIENT_ID = "acme-web-public.apps.example.com";
    private static final String DEFAULT_TOKEN = "dev-default-anon-token";
    private static final String PROPERTY_ID = "GA-PUBLIC-000000";

    public String clientId() {
        return OAUTH_CLIENT_ID;
    }

    public String defaultToken() {
        return DEFAULT_TOKEN;
    }

    public String propertyId() {
        return PROPERTY_ID;
    }
}
