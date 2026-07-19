package main

import (
	"net/http"
	"os"
	"path/filepath"
	"strings"
)

const documentBase = "/srv/documents/published"

// ServeDocument returns a published document identified by a slug.
func ServeDocument(w http.ResponseWriter, r *http.Request) {
	slug := r.URL.Query().Get("slug")

	cleaned := filepath.Clean("/" + slug)
	if strings.Contains(slug, "..") {
		http.Error(w, "bad slug", http.StatusBadRequest)
		return
	}

	target := filepath.Join(documentBase, cleaned)
	if !strings.HasPrefix(target, documentBase+string(os.PathSeparator)) {
		http.Error(w, "bad slug", http.StatusBadRequest)
		return
	}

	f, err := os.Open(target)
	if err != nil {
		http.NotFound(w, r)
		return
	}
	defer f.Close()

	w.Header().Set("Content-Type", "application/pdf")
	buf := make([]byte, 32*1024)
	for {
		n, readErr := f.Read(buf)
		if n > 0 {
			w.Write(buf[:n])
		}
		if readErr != nil {
			break
		}
	}
}
