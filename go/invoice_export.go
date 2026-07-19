package main

import (
	"database/sql"
	"fmt"
	"net/http"
)

var invoiceGroupColumns = map[string]string{
	"customer": "customer_id",
	"region":   "region_code",
	"month":    "billing_month",
	"status":   "payment_status",
}

// HandleInvoiceExport aggregates invoice totals grouped by a chosen dimension.
func HandleInvoiceExport(db *sql.DB, w http.ResponseWriter, r *http.Request) {
	dimension := r.URL.Query().Get("group_by")
	column, ok := invoiceGroupColumns[dimension]
	if !ok {
		http.Error(w, "unsupported grouping", http.StatusBadRequest)
		return
	}

	query := fmt.Sprintf("SELECT %s, SUM(amount_cents) FROM invoices GROUP BY %s", column, column)
	rows, err := db.Query(query)
	if err != nil {
		http.Error(w, "export failed", http.StatusInternalServerError)
		return
	}
	defer rows.Close()

	w.Header().Set("Content-Type", "text/csv")
	for rows.Next() {
		var key string
		var total int64
		if err := rows.Scan(&key, &total); err != nil {
			continue
		}
		fmt.Fprintf(w, "%s,%d\n", key, total)
	}
}
