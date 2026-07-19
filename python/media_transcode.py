import subprocess

from flask import Flask, request, jsonify

app = Flask(__name__)

PRESETS = {
    "web-720": ["-vf", "scale=-2:720", "-b:v", "2500k"],
    "web-1080": ["-vf", "scale=-2:1080", "-b:v", "5000k"],
    "audio-only": ["-vn", "-b:a", "128k"],
    "thumbnail": ["-vframes", "1", "-q:v", "3"],
}


@app.route("/transcode", methods=["POST"])
def transcode():
    payload = request.get_json(force=True)
    preset_name = payload.get("preset", "")
    source = payload.get("source_id", "")

    if preset_name not in PRESETS:
        return jsonify({"error": "unknown preset"}), 400

    if not source.isalnum():
        return jsonify({"error": "invalid source"}), 400

    input_path = "/media/ingest/%s.mov" % source
    output_path = "/media/out/%s-%s.mp4" % (source, preset_name)

    args = ["ffmpeg", "-i", input_path] + PRESETS[preset_name] + [output_path]
    result = subprocess.run(args, capture_output=True)

    return jsonify({"status": "ok", "code": result.returncode})
