/**
 * Continue a failed nightly-batch run from the failed rows.
 * Finished rows stay finished.
 *
 *   GRAPHINGEST_RUN_ID is the id on https://www.graphingest.io/runs
 *   GRAPHINGEST_API_KEY is the key from https://www.graphingest.io/settings
 */

const runId = process.env.GRAPHINGEST_RUN_ID;
const key = process.env.GRAPHINGEST_API_KEY;
const base = (process.env.GRAPHINGEST_API_URL ?? "https://www.graphingest.io").replace(/\/$/, "");

if (!runId || !key) {
  console.error("Set GRAPHINGEST_RUN_ID and GRAPHINGEST_API_KEY, then run this again.");
  process.exit(1);
}

const resp = await fetch(`${base}/api/runs/${runId}/restart`, {
  method: "POST",
  headers: { Authorization: `Bearer ${key}` },
});

if (!resp.ok) {
  console.error(await resp.text());
  process.exit(1);
}

console.log(await resp.json());
