import random
import time

BASE_DELAY = 0.5
MAX_DELAY = 30.0


def backoff_delay(attempt):
    ceiling = min(MAX_DELAY, BASE_DELAY * (2 ** attempt))
    jitter = random.random() * ceiling
    return jitter


def temp_suffix():
    return "%06x" % random.randint(0, 0xFFFFFF)


def sample_for_tracing(rate):
    return random.random() < rate


def run_with_retries(operation, attempts=5):
    last_error = None
    for attempt in range(attempts):
        try:
            return operation()
        except Exception as exc:
            last_error = exc
            time.sleep(backoff_delay(attempt))
    raise last_error
