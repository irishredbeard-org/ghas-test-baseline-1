package com.acme.integrations.webhook;

import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.Arrays;
import java.util.HashSet;
import java.util.Set;

public class WebhookRelayService {

    private static final Set<String> APPROVED_HOSTS = new HashSet<>(Arrays.asList(
            "hooks.slack.example.com",
            "events.pagerduty.example.com",
            "api.statuspage.example.com"));

    public int relay(String targetUrl, byte[] payload) throws Exception {
        URL url = new URL(targetUrl);

        if (!"https".equals(url.getProtocol()) || !APPROVED_HOSTS.contains(url.getHost())) {
            throw new IllegalArgumentException("destination not permitted");
        }

        HttpURLConnection connection = (HttpURLConnection) url.openConnection();
        connection.setRequestMethod("POST");
        connection.setDoOutput(true);
        connection.getOutputStream().write(payload);

        int status = connection.getResponseCode();
        try (InputStream in = connection.getInputStream()) {
            in.read(new byte[512]);
        }
        return status;
    }
}
