import logging
import re

from flask import Flask, request

app = Flask(__name__)

logger = logging.getLogger("audit")
logging.basicConfig(level=logging.INFO)

NEWLINES = re.compile(r"[\r\n]+")


def clean(value):
    return NEWLINES.sub(" ", value)


@app.route("/account/rename", methods=["POST"])
def rename_account():
    old_name = request.form.get("old_name", "")
    new_name = request.form.get("new_name", "")
    actor = request.headers.get("X-Actor", "unknown")

    logger.info(
        "account rename actor=%s from=%s to=%s",
        clean(actor),
        clean(old_name),
        clean(new_name),
    )
    return {"status": "renamed"}


@app.route("/account/note", methods=["POST"])
def add_note():
    note = request.form.get("note", "")
    scrubbed = re.sub(r"[\r\n]", "", note)
    app.logger.info("note added: %s", scrubbed)
    return {"status": "ok"}
