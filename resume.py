"""Restart a failed nightly-batch run from the failed items.

Completed items are left as they are. Only failed tasks run again.

    GRAPHINGEST_RUN_ID=<run-id> python resume.py
"""

import os
import requests

run_id = os.environ["GRAPHINGEST_RUN_ID"]
base = os.environ.get("GRAPHINGEST_API_URL", "https://www.graphingest.io").rstrip("/")
key = os.environ["GRAPHINGEST_API_KEY"]

resp = requests.post(
    f"{base}/api/runs/{run_id}/restart",
    headers={"Authorization": f"Bearer {key}"},
    timeout=30,
)
resp.raise_for_status()
print(resp.json())
