package main

import (
	"database/sql"
	"fmt"
	"net/http"
	"regexp"
)

var reportColumnPattern = regexp.MustCompile(`^[A-Za-z0-9_]+$`)

// HandleReportSort returns report rows ordered by a caller supplied column.
func HandleReportSort(db *sql.DB, w http.ResponseWriter, r *http.Request) {
	sortField := r.URL.Query().Get("sort")
	if !reportColumnPattern.MatchString(sortField) {
		http.Error(w, "invalid sort field", http.StatusBadRequest)
		return
	}

	direction := "ASC"
	if r.URL.Query().Get("dir") == "desc" {
		direction = "DESC"
	}

	query := fmt.Sprintf("SELECT id, title, created_at FROM reports ORDER BY %s %s", sortField, direction)
	rows, err := db.Query(query)
	if err != nil {
		http.Error(w, "query failed", http.StatusInternalServerError)
		return
	}
	defer rows.Close()

	for rows.Next() {
		var id int
		var title, createdAt string
		if err := rows.Scan(&id, &title, &createdAt); err != nil {
			continue
		}
		fmt.Fprintf(w, "%d\t%s\t%s\n", id, title, createdAt)
	}
}
