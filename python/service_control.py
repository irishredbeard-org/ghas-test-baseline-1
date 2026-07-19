import subprocess

from flask import Flask, request, jsonify

app = Flask(__name__)

MANAGED_UNITS = {
    "ingest-worker": "ingest-worker.service",
    "billing-cron": "billing-cron.service",
    "report-builder": "report-builder.service",
}

ACTIONS = ("status", "restart", "stop", "start")


@app.route("/ops/service", methods=["POST"])
def control_service():
    name = request.form.get("service", "")
    action = request.form.get("action", "")

    if name not in MANAGED_UNITS:
        return jsonify({"error": "unknown service"}), 404

    if action not in ACTIONS:
        return jsonify({"error": "unknown action"}), 400

    unit = MANAGED_UNITS[name]
    completed = subprocess.run(
        ["systemctl", action, unit],
        capture_output=True,
        text=True,
    )

    return jsonify({"unit": unit, "rc": completed.returncode, "out": completed.stdout})
