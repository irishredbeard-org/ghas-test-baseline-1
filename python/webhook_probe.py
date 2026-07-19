from urllib.parse import urlparse

import requests
from flask import Flask, request, jsonify, abort

app = Flask(__name__)

APPROVED_HOSTS = {
    "hooks.example-partner.com",
    "api.trusted-vendor.net",
    "events.example.com",
}


@app.route("/webhooks/verify", methods=["POST"])
def verify_webhook():
    url = request.json.get("callback_url", "")
    parsed = urlparse(url)

    if parsed.scheme != "https":
        abort(400)

    if parsed.hostname not in APPROVED_HOSTS:
        abort(403)

    resp = requests.get(url, timeout=5)
    return jsonify({"status": resp.status_code})


@app.route("/webhooks/fetch-config")
def fetch_config():
    host = request.args.get("host", "")
    if host not in APPROVED_HOSTS:
        abort(403)

    endpoint = "https://%s/.well-known/webhook-config" % host
    resp = requests.get(endpoint, timeout=5)
    return jsonify(resp.json())
