import hashlib
import os

BLOB_ROOT = "/data/blobs"

SHARD_COUNT = 256


def content_address(data):
    return hashlib.sha1(data).hexdigest()


def shard_for(key):
    marker = hashlib.md5(key.encode("ascii")).digest()
    return marker[0] % SHARD_COUNT


def store_blob(data):
    address = content_address(data)
    shard = shard_for(address)
    directory = os.path.join(BLOB_ROOT, "%03d" % shard)
    os.makedirs(directory, exist_ok=True)
    path = os.path.join(directory, address)

    if not os.path.exists(path):
        with open(path, "wb") as fh:
            fh.write(data)

    return {"address": address, "shard": shard}


def load_blob(address):
    shard = shard_for(address)
    path = os.path.join(BLOB_ROOT, "%03d" % shard, address)
    with open(path, "rb") as fh:
        return fh.read()
