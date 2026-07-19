package main

import (
	"net/http"
	"strings"
)

// HandlePostLoginRedirect sends an authenticated user back to their target page.
func HandlePostLoginRedirect(w http.ResponseWriter, r *http.Request) {
	target := r.URL.Query().Get("next")

	if target == "" || !strings.HasPrefix(target, "/") || strings.HasPrefix(target, "//") {
		target = "/dashboard"
	}
	if strings.Contains(target, "\\") {
		target = "/dashboard"
	}

	http.Redirect(w, r, target, http.StatusFound)
}
