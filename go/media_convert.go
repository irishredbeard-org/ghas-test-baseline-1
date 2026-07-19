package main

import (
	"net/http"
	"os/exec"
)

var conversionProfiles = map[string][]string{
	"thumbnail": {"-vf", "scale=160:-1", "-frames:v", "1"},
	"preview":   {"-vf", "scale=640:-1", "-t", "5"},
	"audio":     {"-vn", "-acodec", "libmp3lame", "-b:a", "128k"},
}

// RunMediaConversion transcodes an uploaded asset using a named profile.
func RunMediaConversion(w http.ResponseWriter, r *http.Request) {
	profileName := r.URL.Query().Get("profile")
	args, ok := conversionProfiles[profileName]
	if !ok {
		http.Error(w, "unknown profile", http.StatusBadRequest)
		return
	}

	cmdArgs := append([]string{"-i", "/tmp/input.dat"}, args...)
	cmdArgs = append(cmdArgs, "/tmp/output.dat")

	cmd := exec.Command("ffmpeg", cmdArgs...)
	if err := cmd.Run(); err != nil {
		http.Error(w, "conversion failed", http.StatusInternalServerError)
		return
	}
	w.WriteHeader(http.StatusAccepted)
}
