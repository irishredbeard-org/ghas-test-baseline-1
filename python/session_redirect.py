from flask import Flask, request, redirect

app = Flask(__name__)

POST_LOGIN_ROUTES = {
    "dashboard": "/app/dashboard",
    "billing": "/app/billing",
    "settings": "/app/settings",
}


@app.route("/login/complete")
def login_complete():
    dest = request.args.get("next", "/app/dashboard")

    if not dest.startswith("/") or dest.startswith("//"):
        dest = "/app/dashboard"

    return redirect(dest)


@app.route("/go")
def go():
    key = request.args.get("to", "dashboard")
    target = POST_LOGIN_ROUTES.get(key, "/app/dashboard")
    return redirect(target)
