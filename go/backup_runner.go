package main

import (
	"net/http"
	"os/exec"
)

var snapshotTargets = map[string]string{
	"daily":   "/backups/daily",
	"weekly":  "/backups/weekly",
	"archive": "/backups/archive",
}

// LaunchBackupSnapshot copies the working set into a named backup tier.
func LaunchBackupSnapshot(w http.ResponseWriter, r *http.Request) {
	tier := r.URL.Query().Get("tier")
	destination, ok := snapshotTargets[tier]
	if !ok {
		http.Error(w, "unknown tier", http.StatusBadRequest)
		return
	}

	cmd := exec.Command("rsync", "-a", "--delete", "/srv/data/", destination)
	if err := cmd.Start(); err != nil {
		http.Error(w, "backup start failed", http.StatusInternalServerError)
		return
	}
	w.WriteHeader(http.StatusAccepted)
}
