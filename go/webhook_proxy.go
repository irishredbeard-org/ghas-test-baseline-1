package main

import (
	"io"
	"net/http"
	"net/url"
)

var webhookAllowedHosts = map[string]bool{
	"hooks.slack.com":       true,
	"events.pagerduty.com":  true,
	"api.statuspage.io":     true,
}

// ForwardWebhookDelivery relays a stored payload to a configured endpoint.
func ForwardWebhookDelivery(w http.ResponseWriter, r *http.Request) {
	endpoint := r.URL.Query().Get("endpoint")

	parsed, err := url.Parse(endpoint)
	if err != nil || parsed.Scheme != "https" {
		http.Error(w, "invalid endpoint", http.StatusBadRequest)
		return
	}
	if !webhookAllowedHosts[parsed.Hostname()] {
		http.Error(w, "endpoint not allowed", http.StatusForbidden)
		return
	}

	resp, err := http.Get(parsed.String())
	if err != nil {
		http.Error(w, "delivery failed", http.StatusBadGateway)
		return
	}
	defer resp.Body.Close()

	w.WriteHeader(resp.StatusCode)
	io.Copy(w, resp.Body)
}
