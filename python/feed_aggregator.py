from urllib.parse import urlparse

import requests
from flask import Flask, request, jsonify, abort

app = Flask(__name__)

FEED_SOURCES = {
    "weather": "https://feeds.example.com/weather.json",
    "market": "https://feeds.example.com/market.json",
    "news": "https://news-api.example.com/top.json",
}

ALLOWED_FEED_HOSTS = {"feeds.example.com", "news-api.example.com"}


@app.route("/feeds/<name>")
def get_feed(name):
    if name not in FEED_SOURCES:
        abort(404)
    resp = requests.get(FEED_SOURCES[name], timeout=8)
    return jsonify(resp.json())


@app.route("/feeds/custom")
def custom_feed():
    url = request.args.get("src", "")
    host = urlparse(url).hostname

    if host not in ALLOWED_FEED_HOSTS:
        abort(403)

    resp = requests.get(url, timeout=8)
    return jsonify({"length": len(resp.content)})
