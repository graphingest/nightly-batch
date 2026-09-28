# A long list, continued from the row that failed

You have a list. Five hundred invoices. Ten thousand photos. A spreadsheet of customers. The job is the same for every row: do this one thing, then the next row.

If row 240 fails, starting over is painful. Rows 1 through 239 already succeeded. You want the job to pick up at 240 and leave the finished rows alone.

This starter is that pattern.

## When this fits

Use it when the work is one action repeated across a list, and a failure in the middle should not throw away the work that already finished.

Everyday cases:

- Import a CSV of customers. One bad email should not make you import the whole file again.
- Resize a folder of product photos overnight. The photos that already resized stay resized.
- Send a reminder for each unpaid invoice. The ones that already went out stay sent.
- Check a list of links. Record the broken ones, and skip the links you already checked today.

Each row is remembered for a day. If the same row shows up again today, the saved result comes back and the work is not repeated. Tomorrow, that memory expires and the row can run fresh.

## What happens when something fails

The dashboard shows the run, and it shows which rows finished and which row failed.

`resume.py` continues that same run. Finished rows stay finished. The failed row runs again, then the rows that were waiting behind it.

You will need the run id from the dashboard. It looks like a long id on the run page. Put it in the command below. You also need the API key from Settings, stored as `GRAPHINGEST_API_KEY`, not written into the file.

## What you need

- A GraphIngest account.
- An API key from Settings, in the environment as `GRAPHINGEST_API_KEY`.

## How to run it

Register the job and process twelve sample rows:

```bash
pip install -r requirements.txt
python nightly_batch.py
```

Open the dashboard and confirm every sample row completed.

To continue a run that stopped on a bad row:

```bash
GRAPHINGEST_RUN_ID=the-id-from-the-dashboard python resume.py
```

Replace `the-id-from-the-dashboard` with the id you copied. On Windows PowerShell, set the variable first:

```powershell
$env:GRAPHINGEST_RUN_ID = "the-id-from-the-dashboard"
python resume.py
```

Then change the list in `nightly_batch.py` to your real rows. Each row needs an `id` so a repeat of the same row can be recognized.
