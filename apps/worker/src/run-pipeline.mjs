import { syncAllSources } from "../../../packages/connectors/src/index.mjs";
import {
  accountMatrix,
  contentJobs,
  eventClusters
} from "../../../packages/domain/src/mock-data.mjs";
import {
  advanceOrThrow
} from "../../../packages/domain/src/state-machines.mjs";
import {
  evaluateAccountHealth,
  evaluateSimilarityGate,
  requiresHumanTakeover
} from "../../../packages/risk-engine/src/index.mjs";

const events = syncAllSources();
const event = eventClusters[0];
const job = contentJobs[0];

const flow = [];
flow.push(advanceOrThrow("ingestion", "source_pending", "fetching"));
flow.push(advanceOrThrow("ingestion", "fetching", "normalized"));
flow.push(advanceOrThrow("ingestion", "normalized", "deduplicated"));
flow.push(advanceOrThrow("ingestion", "deduplicated", "clustered"));
flow.push(advanceOrThrow("ingestion", "clustered", "analyzed_ready"));
flow.push(advanceOrThrow("generation", "analyzed_ready", "selected"));
flow.push(advanceOrThrow("generation", "selected", "drafting"));
flow.push(advanceOrThrow("generation", "drafting", "drafted"));
flow.push(advanceOrThrow("generation", "drafted", "draft_scored"));
flow.push(advanceOrThrow("humanization", "drafted", "humanizing"));
flow.push(advanceOrThrow("humanization", "humanizing", "humanized"));
flow.push(advanceOrThrow("humanization", "humanized", "humanized_verified"));
flow.push(advanceOrThrow("review", "humanized_verified", "machine_reviewing"));
flow.push(advanceOrThrow("review", "machine_reviewing", "machine_passed"));
flow.push(advanceOrThrow("review", "machine_passed", "human_review_pending"));

const similarityGate = evaluateSimilarityGate(job.variants);
const accountGate = evaluateAccountHealth(accountMatrix);
const takeover = requiresHumanTakeover(event);

console.log(
  JSON.stringify(
    {
      syncedSources: events.length,
      event: event.id,
      flow,
      similarityGate,
      accountGate,
      takeover
    },
    null,
    2
  )
);
