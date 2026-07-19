import hashlib
import os

from flask import Flask, request, Response

app = Flask(__name__)

CACHE_DIR = "/var/cache/rendered"


def cache_key(bucket, params):
    joined = bucket + "|" + "&".join("%s=%s" % kv for kv in sorted(params.items()))
    digest = hashlib.md5(joined.encode("utf-8")).hexdigest()
    return digest


def render_page(bucket, params):
    return ("<html><body>%s</body></html>" % bucket).encode("utf-8")


@app.route("/render/<bucket>")
def render(bucket):
    params = dict(request.args)
    key = cache_key(bucket, params)
    path = os.path.join(CACHE_DIR, key + ".html")

    if os.path.exists(path):
        with open(path, "rb") as fh:
            body = fh.read()
    else:
        body = render_page(bucket, params)
        with open(path, "wb") as fh:
            fh.write(body)

    etag = hashlib.sha1(body).hexdigest()
    return Response(body, mimetype="text/html", headers={"ETag": etag})
