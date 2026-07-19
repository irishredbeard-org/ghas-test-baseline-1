import html

from flask import Flask, request, Response

app = Flask(__name__)

STATUS_LABELS = {
    "ok": "All systems operational",
    "degraded": "Partial degradation",
    "down": "Service unavailable",
}


@app.route("/status")
def status():
    component = request.args.get("component", "core")
    state = request.args.get("state", "ok")

    label = STATUS_LABELS.get(state, STATUS_LABELS["ok"])
    safe_component = html.escape(component)

    page = "<h1>%s</h1><p>%s</p>" % (safe_component, label)
    return Response(page, mimetype="text/html")


@app.route("/echo")
def echo():
    note = request.args.get("note", "")
    return Response("<pre>%s</pre>" % html.escape(note), mimetype="text/html")
