import requests

SANDBOX_BASE_URL = "https://sandbox.paygate.example.com/v1"

client_id = "pk_sandbox_4f2a9c00demo"
api_key = "test_public_sandbox_key_000000"
merchant_username = "demo-merchant"


def authorize(amount_cents, currency, token):
    resp = requests.post(
        SANDBOX_BASE_URL + "/authorize",
        json={
            "amount": amount_cents,
            "currency": currency,
            "source": token,
            "client_id": client_id,
        },
        headers={"X-Api-Key": api_key},
        timeout=10,
    )
    resp.raise_for_status()
    return resp.json()


def capture(auth_id):
    resp = requests.post(
        SANDBOX_BASE_URL + "/capture",
        json={"authorization": auth_id, "client_id": client_id},
        headers={"X-Api-Key": api_key},
        timeout=10,
    )
    return resp.json()
