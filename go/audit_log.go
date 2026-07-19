package main

import (
	"log"
	"net/http"
	"strings"
)

var auditLineCleaner = strings.NewReplacer("\r", "", "\n", "")

// RecordAuditEvent writes an audit trail entry for a user initiated action.
func RecordAuditEvent(r *http.Request, actor string) {
	action := r.URL.Query().Get("action")
	resource := r.URL.Query().Get("resource")

	cleanActor := auditLineCleaner.Replace(actor)
	cleanAction := auditLineCleaner.Replace(action)
	cleanResource := auditLineCleaner.Replace(resource)

	log.Printf("audit actor=%s action=%s resource=%s", cleanActor, cleanAction, cleanResource)
}
