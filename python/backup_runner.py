import subprocess

from flask import Flask, request, jsonify

app = Flask(__name__)

TARGETS = {
    "primary": ("db-primary.internal", "5432"),
    "replica": ("db-replica.internal", "5432"),
    "analytics": ("db-analytics.internal", "5432"),
}


@app.route("/backups/run", methods=["POST"])
def run_backup():
    target = request.json.get("target")

    if target not in TARGETS:
        return jsonify({"error": "invalid target"}), 400

    host, port = TARGETS[target]

    cmd = [
        "pg_dump",
        "--host", host,
        "--port", port,
        "--format", "custom",
        "--file", "/backups/%s.dump" % target,
        "appdb",
    ]
    proc = subprocess.run(cmd, capture_output=True)

    return jsonify({"target": target, "returncode": proc.returncode})
