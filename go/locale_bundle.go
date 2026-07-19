package main

import (
	"encoding/json"
	"net/http"
	"os"
	"path/filepath"
	"regexp"
)

const localeRoot = "/opt/app/i18n"

var localeCodePattern = regexp.MustCompile(`^[a-z]{2}(-[A-Z]{2})?$`)

// HandleLocaleBundle returns the translation bundle for a locale code.
func HandleLocaleBundle(w http.ResponseWriter, r *http.Request) {
	locale := r.URL.Query().Get("locale")
	if !localeCodePattern.MatchString(locale) {
		http.Error(w, "unknown locale", http.StatusBadRequest)
		return
	}

	bundlePath := filepath.Join(localeRoot, locale+".json")
	data, err := os.ReadFile(bundlePath)
	if err != nil {
		http.Error(w, "bundle missing", http.StatusNotFound)
		return
	}

	var parsed map[string]string
	if err := json.Unmarshal(data, &parsed); err != nil {
		http.Error(w, "corrupt bundle", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(parsed)
}
