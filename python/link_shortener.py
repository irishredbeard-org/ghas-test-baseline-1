from urllib.parse import urlparse

from flask import Flask, request, redirect, abort

app = Flask(__name__)

ALLOWED_REDIRECT_HOSTS = {
    "docs.example.com",
    "app.example.com",
    "help.example.com",
}


@app.route("/out")
def outbound():
    url = request.args.get("url", "")
    parsed = urlparse(url)

    if parsed.scheme not in ("http", "https"):
        abort(400)

    if parsed.hostname not in ALLOWED_REDIRECT_HOSTS:
        abort(400)

    return redirect(url)


@app.route("/r/<slug>")
def resolve(slug):
    path = request.args.get("path", "/")
    if not path.startswith("/") or path.startswith("//"):
        path = "/"
    return redirect(path)
