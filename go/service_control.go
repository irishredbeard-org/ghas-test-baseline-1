package main

import (
	"net/http"
	"os/exec"
	"regexp"
)

var serviceUnitPattern = regexp.MustCompile(`^[a-z0-9-]+$`)

var permittedServiceActions = map[string]bool{
	"status":  true,
	"restart": true,
	"reload":  true,
}

// TriggerServiceAction runs a systemctl operation on an allowed unit.
func TriggerServiceAction(w http.ResponseWriter, r *http.Request) {
	action := r.URL.Query().Get("action")
	unit := r.URL.Query().Get("unit")

	if !permittedServiceActions[action] {
		http.Error(w, "action not allowed", http.StatusForbidden)
		return
	}
	if !serviceUnitPattern.MatchString(unit) {
		http.Error(w, "invalid unit", http.StatusBadRequest)
		return
	}

	cmd := exec.Command("systemctl", action, unit+".service")
	output, err := cmd.CombinedOutput()
	if err != nil {
		http.Error(w, "action failed", http.StatusInternalServerError)
		return
	}
	w.Write(output)
}
