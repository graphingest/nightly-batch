# A long list, continued from the row that failed

You have a list. Five hundred invoices. Ten thousand photos. A spreadsheet of customers. The job is the same for every row: do this one thing, then the next row.

If row 240 fails, starting over is painful. Rows 1 through 239 already succeeded. You want the job to pick up at 240 and leave the finished rows alone.

This starter is that pattern, running on [GraphIngest](https://www.graphingest.io).

## When this fits

Use it when the work is one action repeated across a list, and a failure in the middle should not throw away the work that already finished. [graphingest.io](https://www.graphingest.io) remembers which rows already finished.

Everyday cases:

- Import a CSV of customers. One bad email should not make you import the whole file again.
- Resize a folder of product photos overnight. The photos that already resized stay resized.
- Send a reminder for each unpaid invoice. The ones that already went out stay sent.
- Check a list of links. Record the broken ones, and skip the links you already checked today.

Each row is remembered for a day. If the same row shows up again today, the saved result comes back and the work is not repeated. Tomorrow, that memory expires and the row can run fresh. The same idea is described in the [docs](https://www.graphingest.io/docs).

## What happens when something fails

[The dashboard](https://www.graphingest.io/dashboard) shows the run, and [the runs page](https://www.graphingest.io/runs) shows which rows finished and which row failed.

This folder is the Python starter. `resume.py` continues that same run on [graphingest.io](https://www.graphingest.io). Finished rows stay finished. The failed row runs again, then the rows that were waiting behind it.

You will need the run id from [the run page](https://www.graphingest.io/runs). It looks like a long id on that page. Put it in the command below. You also need the API key from [Settings](https://www.graphingest.io/settings), stored as `GRAPHINGEST_API_KEY`, not written into the file.

## What you need

- A GraphIngest account. Create one at [graphingest.io/signup](https://www.graphingest.io/signup).
- An API key from [Settings](https://www.graphingest.io/settings), in the environment as `GRAPHINGEST_API_KEY`.

## How to run it

Register the job and process twelve sample rows:

```bash
pip install -r requirements.txt
python nightly_batch.py
```

Open [the dashboard](https://www.graphingest.io/dashboard) and confirm every sample row completed.

To continue a run that stopped on a bad row, copy the id from [graphingest.io/runs](https://www.graphingest.io/runs):

```bash
GRAPHINGEST_RUN_ID=the-id-from-the-dashboard python resume.py
```

Replace `the-id-from-the-dashboard` with the id you copied. On Windows PowerShell, set the variable first:

```powershell
$env:GRAPHINGEST_RUN_ID = "the-id-from-the-dashboard"
python resume.py
```

Then change the list in `nightly_batch.py` to your real rows. Each row needs an `id` so a repeat of the same row can be recognized. The next run shows up on [graphingest.io](https://www.graphingest.io) the same way the sample did.
