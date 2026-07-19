import os

GOOGLE_CLIENT_ID = "407408718192.apps.googleusercontent.com"

DEFAULT_DEV_USERNAME = "developer"
DEFAULT_DEV_PASSWORD = "changeme"

SERVICE_ACCOUNT_EMAIL = "ci-runner@example-project.iam.gserviceaccount.com"

DEMO_TENANT_TOKEN = "demo-tenant-0001"


class Settings:
    def __init__(self):
        self.client_id = os.environ.get("OAUTH_CLIENT_ID", GOOGLE_CLIENT_ID)
        self.username = os.environ.get("APP_USER", DEFAULT_DEV_USERNAME)
        self.password = os.environ.get("APP_PASSWORD", DEFAULT_DEV_PASSWORD)
        self.tenant_token = os.environ.get("TENANT_TOKEN", DEMO_TENANT_TOKEN)

    def as_dict(self):
        return {
            "client_id": self.client_id,
            "username": self.username,
            "tenant_token": self.tenant_token,
        }


settings = Settings()
