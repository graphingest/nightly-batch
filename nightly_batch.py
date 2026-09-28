"""
Process a list with .map(). Cached items are not redone.

    pip install -r requirements.txt
    python nightly_batch.py

A failed run resumes from the failed item:

    GRAPHINGEST_RUN_ID=<run-id> python resume.py
"""

from graphingest import node, graph, deploy, RetryPolicy


@node(name="process-item", cache_ttl=86400, max_retries=2, timeout_seconds=120)
def process_item(item: dict) -> dict:
    # Raise here to see a partial failure, then resume.py.
    return {"id": item["id"], "ok": True}


@graph(
    name="nightly-batch",
    timeout_seconds=7200,
    retry_policy=RetryPolicy(max_retries=2, delay_seconds=10, backoff_factor=2),
)
def nightly_batch(items: list[dict]):
    results = process_item.map(items)
    return {"processed": len(results), "ids": [r["id"] for r in results]}


if __name__ == "__main__":
    deploy()
    items = [{"id": f"item-{i}"} for i in range(12)]
    print(nightly_batch(items))
