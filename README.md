# nightly-batch

`.map()` walks a list. Each item is cached for a day, so a retry does not redo work that already finished. If a run fails partway, `resume.py` restarts that run from the failed items. Completed items stay completed.

## Run

```bash
pip install -r requirements.txt
python nightly_batch.py
```

If the dashboard shows a failed run, copy its id and resume:

```bash
GRAPHINGEST_RUN_ID=<run-id> python resume.py
```
