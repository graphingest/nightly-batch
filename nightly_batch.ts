/**
 * Process a list with .map(). Cached items are not redone.
 * Same job as nightly_batch.py, written in TypeScript.
 *
 *   npm install
 *   npm run deploy
 *
 * A failed run resumes from the failed item:
 *   set GRAPHINGEST_RUN_ID to the id from https://www.graphingest.io/runs
 *   npm run resume
 */

import { node, graph, deploy } from "graphingest";

type Item = { id: string };
type ItemResult = { id: string; ok: boolean };

const processItem = node(
  { name: "process-item", cacheTtl: 86400, maxRetries: 2, timeoutSeconds: 120 },
  async (item: Item): Promise<ItemResult> => {
    return { id: item.id, ok: true };
  }
);

const nightlyBatch = graph(
  {
    name: "nightly-batch",
    timeoutMs: 7_200_000,
    retryPolicy: { maxRetries: 2, delayMs: 10_000, backoffFactor: 2 },
  },
  async (items: Item[]) => {
    const results = (await processItem.map(items)) as ItemResult[];
    return { processed: results.length, ids: results.map((row) => row.id) };
  }
);

await deploy();

const items = Array.from({ length: 12 }, (_, i) => ({ id: `item-${i}` }));
console.log(await nightlyBatch(items));
