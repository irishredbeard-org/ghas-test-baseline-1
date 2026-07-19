import os
import re

from flask import Flask, request, Response, abort

app = Flask(__name__)

DOCS_DIR = "/srv/documents"

SEGMENT = re.compile(r"[A-Za-z0-9_-]+")


def is_clean(part):
    return bool(SEGMENT.fullmatch(part)) and part not in ("..", ".")


@app.route("/download")
def download():
    category = request.args.get("category", "")
    doc = request.args.get("doc", "")

    if not is_clean(category) or not is_clean(doc):
        abort(400)

    path = os.path.join(DOCS_DIR, category, doc + ".pdf")

    real = os.path.realpath(path)
    if not real.startswith(DOCS_DIR + os.sep):
        abort(400)

    with open(path, "rb") as fh:
        body = fh.read()

    return Response(body, mimetype="application/pdf")
