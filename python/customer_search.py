import re

import psycopg2
from flask import Flask, request, jsonify

app = Flask(__name__)

CONN_INFO = "dbname=crm user=app host=127.0.0.1"

TENANT_PATTERN = re.compile(r"[A-Za-z0-9_]+")


def fetch(sql):
    conn = psycopg2.connect(CONN_INFO)
    try:
        cur = conn.cursor()
        cur.execute(sql)
        return cur.fetchall()
    finally:
        conn.close()


@app.route("/tenants/<tenant>/customers")
def customers_for_tenant(tenant):
    if not TENANT_PATTERN.fullmatch(tenant):
        return jsonify({"error": "invalid tenant"}), 400

    schema = "tenant_" + tenant
    sql = "SELECT id, display_name FROM %s.customers ORDER BY display_name" % schema

    results = fetch(sql)
    return jsonify([{"id": r[0], "name": r[1]} for r in results])


@app.route("/segments")
def segment_counts():
    field = request.args.get("field", "")
    if not re.fullmatch(r"[a-z_]{1,32}", field):
        return jsonify({"error": "invalid field"}), 400

    sql = "SELECT " + field + ", COUNT(*) FROM customers GROUP BY " + field + " ORDER BY 2 DESC"
    rows = fetch(sql)
    return jsonify([{"value": r[0], "count": r[1]} for r in rows])
