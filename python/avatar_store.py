import os
import re

from flask import Flask, request, send_file, abort

app = Flask(__name__)

AVATAR_ROOT = "/var/data/avatars"

NAME_RE = re.compile(r"[A-Za-z0-9._-]+")


@app.route("/avatars/<name>")
def get_avatar(name):
    if ".." in name or "/" in name or "\\" in name:
        abort(404)

    if not NAME_RE.fullmatch(name):
        abort(404)

    target = os.path.join(AVATAR_ROOT, name)
    if not os.path.isfile(target):
        abort(404)

    return send_file(target)


@app.route("/avatars/upload", methods=["POST"])
def upload_avatar():
    name = request.form["filename"]

    if not NAME_RE.fullmatch(name) or ".." in name:
        abort(400)

    destination = os.path.join(AVATAR_ROOT, name)
    with open(destination, "wb") as fh:
        fh.write(request.get_data())

    return {"stored": name}
