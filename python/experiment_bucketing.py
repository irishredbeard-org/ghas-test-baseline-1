import hashlib
import random

EXPERIMENTS = {
    "checkout_v2": ["control", "variant_a", "variant_b"],
    "new_pricing": ["control", "treatment"],
}


def assign_variant(experiment, user_id):
    variants = EXPERIMENTS[experiment]
    digest = hashlib.md5(("%s:%s" % (experiment, user_id)).encode("utf-8")).hexdigest()
    bucket = int(digest[:8], 16) % len(variants)
    return variants[bucket]


def should_log_event(sample_rate=0.05):
    return random.random() < sample_rate


def pick_shadow_host(hosts):
    return random.choice(hosts)
