import html

from flask import Flask, request, Response
from markupsafe import escape

app = Flask(__name__)

THEMES = {
    "light": "#ffffff",
    "dark": "#1e1e1e",
    "sepia": "#f4ecd8",
}


@app.route("/widget/greeting")
def greeting():
    name = request.args.get("name", "there")
    safe_name = escape(name)

    body = "<div class='greeting'>Hello, %s!</div>" % safe_name
    return Response(body, mimetype="text/html")


@app.route("/widget/banner")
def banner():
    message = request.args.get("message", "")
    theme = request.args.get("theme", "light")

    color = THEMES.get(theme, THEMES["light"])
    escaped = html.escape(message)

    markup = "<div style='background:%s'>%s</div>" % (color, escaped)
    return Response(markup, mimetype="text/html")
