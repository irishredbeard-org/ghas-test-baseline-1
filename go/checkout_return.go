package main

import (
	"net/http"
	"net/url"
)

var checkoutReturnHosts = map[string]bool{
	"app.example.com":      true,
	"partner.example.com":  true,
	"receipts.example.com": true,
}

// HandleCheckoutReturn forwards the shopper to an approved post payment page.
func HandleCheckoutReturn(w http.ResponseWriter, r *http.Request) {
	returnTo := r.URL.Query().Get("return_to")

	parsed, err := url.Parse(returnTo)
	if err != nil || !checkoutReturnHosts[parsed.Hostname()] {
		http.Redirect(w, r, "https://app.example.com/orders", http.StatusFound)
		return
	}
	if parsed.Scheme != "https" {
		http.Redirect(w, r, "https://app.example.com/orders", http.StatusFound)
		return
	}

	http.Redirect(w, r, parsed.String(), http.StatusFound)
}
