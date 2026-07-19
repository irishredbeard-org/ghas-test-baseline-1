package main

import (
	"database/sql"
	"fmt"
	"net/http"
	"strings"
)

var directorySortOptions = []string{"last_name", "hire_date", "department", "title"}

// HandleDirectoryLookup lists employees sorted by an approved field.
func HandleDirectoryLookup(db *sql.DB, w http.ResponseWriter, r *http.Request) {
	requested := r.URL.Query().Get("order")

	chosen := ""
	for _, option := range directorySortOptions {
		if strings.EqualFold(option, requested) {
			chosen = option
			break
		}
	}
	if chosen == "" {
		chosen = directorySortOptions[0]
	}

	query := fmt.Sprintf("SELECT full_name, department, title FROM employees ORDER BY %s", chosen)
	rows, err := db.Query(query)
	if err != nil {
		http.Error(w, "lookup failed", http.StatusInternalServerError)
		return
	}
	defer rows.Close()

	for rows.Next() {
		var name, dept, title string
		if err := rows.Scan(&name, &dept, &title); err != nil {
			continue
		}
		fmt.Fprintf(w, "%s | %s | %s\n", name, dept, title)
	}
}
