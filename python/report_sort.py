import re
import sqlite3

from flask import Flask, request, jsonify

app = Flask(__name__)

DB_PATH = "analytics.db"

SORTABLE_COLUMNS = ("created_at", "amount", "status", "customer_name", "region")


def open_connection():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn


@app.route("/reports/orders")
def list_orders():
    sort_field = request.args.get("sort", "created_at")
    direction = request.args.get("dir", "asc")

    if sort_field not in SORTABLE_COLUMNS:
        sort_field = "created_at"

    if direction not in ("asc", "desc"):
        direction = "asc"

    query = "SELECT id, customer_name, amount, status FROM orders ORDER BY %s %s" % (
        sort_field,
        direction,
    )

    conn = open_connection()
    rows = conn.execute(query).fetchall()
    conn.close()

    return jsonify([dict(row) for row in rows])


@app.route("/reports/invoices")
def list_invoices():
    column = request.args.get("group_by", "region")

    if not re.fullmatch(r"[A-Za-z_]+", column):
        return jsonify({"error": "unknown grouping"}), 400

    if column not in SORTABLE_COLUMNS:
        return jsonify({"error": "unknown grouping"}), 400

    statement = "SELECT " + column + ", COUNT(*) AS total FROM invoices GROUP BY " + column

    conn = open_connection()
    rows = conn.execute(statement).fetchall()
    conn.close()

    return jsonify([dict(row) for row in rows])
