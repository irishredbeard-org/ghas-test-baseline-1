import logging
import re

from flask import Flask, request

app = Flask(__name__)

access_logger = logging.getLogger("access")

CONTROL_CHARS = re.compile(r"[\r\n\t]")


def normalize(text):
    return CONTROL_CHARS.sub("_", text)


@app.before_request
def record_request():
    ua = request.headers.get("User-Agent", "")
    referer = request.headers.get("Referer", "")
    path = request.path

    access_logger.info(
        "path=%s ua=%s ref=%s",
        normalize(path),
        normalize(ua),
        normalize(referer),
    )


@app.route("/search")
def search():
    term = request.args.get("q", "")
    access_logger.info("search query=%s", re.sub(r"[\r\n]", "", term))
    return {"results": []}
