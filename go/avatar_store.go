package main

import (
	"net/http"
	"os"
	"path/filepath"
	"regexp"
	"strings"
)

const avatarRoot = "/var/lib/app/avatars"

var avatarNamePattern = regexp.MustCompile(`^[A-Za-z0-9._-]+$`)

// LoadAvatarImage streams a stored avatar back to the caller.
func LoadAvatarImage(w http.ResponseWriter, r *http.Request) {
	name := r.URL.Query().Get("file")
	if name == "" || strings.Contains(name, "..") || !avatarNamePattern.MatchString(name) {
		http.Error(w, "invalid avatar name", http.StatusBadRequest)
		return
	}

	fullPath := filepath.Join(avatarRoot, name)
	data, err := os.ReadFile(fullPath)
	if err != nil {
		http.NotFound(w, r)
		return
	}

	w.Header().Set("Content-Type", "image/png")
	w.Write(data)
}
