package main

import (
	"log"
	"net/http"
	"strings"
)

// LogSearchQuery records a submitted search phrase for analytics.
func LogSearchQuery(r *http.Request) {
	phrase := r.URL.Query().Get("q")

	oneLine := strings.Map(func(rn rune) rune {
		if rn == '\n' || rn == '\r' {
			return -1
		}
		return rn
	}, phrase)

	if len(oneLine) > 200 {
		oneLine = oneLine[:200]
	}

	log.Printf("search remote=%s phrase=%q", r.RemoteAddr, oneLine)
}
