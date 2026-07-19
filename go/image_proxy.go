package main

import (
	"io"
	"net/http"
	"net/url"
	"strings"
)

var imageCdnSuffixes = []string{
	".cdn.example.com",
	".images.example.net",
}

// ProxyRemoteImage retrieves an image from an approved CDN and streams it back.
func ProxyRemoteImage(w http.ResponseWriter, r *http.Request) {
	source := r.URL.Query().Get("src")

	parsed, err := url.Parse(source)
	if err != nil || parsed.Scheme != "https" {
		http.Error(w, "bad source", http.StatusBadRequest)
		return
	}

	host := parsed.Hostname()
	approved := false
	for _, suffix := range imageCdnSuffixes {
		if strings.HasSuffix(host, suffix) {
			approved = true
			break
		}
	}
	if !approved {
		http.Error(w, "host not permitted", http.StatusForbidden)
		return
	}

	resp, err := http.Get(parsed.String())
	if err != nil {
		http.Error(w, "fetch failed", http.StatusBadGateway)
		return
	}
	defer resp.Body.Close()

	w.Header().Set("Content-Type", resp.Header.Get("Content-Type"))
	io.Copy(w, resp.Body)
}
