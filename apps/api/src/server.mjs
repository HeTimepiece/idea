import { createServer } from "node:http";
import { URL } from "node:url";
import {
  accountMatrix,
  contentJobs,
  eventClusters
} from "../../../packages/domain/src/mock-data.mjs";
import { syncAllSources } from "../../../packages/connectors/src/index.mjs";
import {
  evaluateAccountHealth,
  evaluateSimilarityGate,
  requiresHumanTakeover
} from "../../../packages/risk-engine/src/index.mjs";

function json(res, code, payload) {
  res.writeHead(code, { "content-type": "application/json; charset=utf-8" });
  res.end(JSON.stringify(payload, null, 2));
}

function buildOverview() {
  const contentJob = contentJobs[0];
  return {
    sources: syncAllSources(),
    events: eventClusters,
    accounts: accountMatrix,
    reviewQueue: [contentJob.review],
    similarityGate: evaluateSimilarityGate(contentJob.variants),
    accountGate: evaluateAccountHealth(accountMatrix),
    manualTakeover: requiresHumanTakeover(eventClusters[0]),
    contentJob
  };
}

const server = createServer((req, res) => {
  const url = new URL(req.url, "http://localhost");
  if (req.method === "GET" && url.pathname === "/api/v1/overview") {
    return json(res, 200, buildOverview());
  }
  if (req.method === "GET" && url.pathname === "/api/v1/topics") {
    return json(res, 200, eventClusters);
  }
  if (req.method === "GET" && url.pathname.startsWith("/api/v1/events/")) {
    const eventId = url.pathname.split("/").pop();
    const event = eventClusters.find((item) => item.id === eventId);
    return event ? json(res, 200, event) : json(res, 404, { error: "event_not_found" });
  }
  if (req.method === "GET" && url.pathname === "/api/v1/accounts/matrix") {
    return json(res, 200, accountMatrix);
  }
  if (req.method === "GET" && url.pathname === "/api/v1/reviews/queue") {
    return json(res, 200, contentJobs.map((job) => job.review));
  }
  if (req.method === "GET" && url.pathname === "/api/v1/content-jobs/job-1/trace") {
    return json(res, 200, contentJobs[0].trace);
  }
  if (req.method === "POST" && url.pathname === "/api/v1/sources/sync") {
    return json(res, 200, { status: "accepted", synced: syncAllSources().length });
  }
  if (req.method === "POST" && url.pathname === "/api/v1/publish-jobs") {
    const similarityGate = evaluateSimilarityGate(contentJobs[0].variants);
    const accountGate = evaluateAccountHealth(accountMatrix);
    return json(res, 202, {
      status: similarityGate.decision === "pass" && accountGate.decision === "pass"
        ? "scheduled"
        : "manual_publish_pending",
      similarityGate,
      accountGate
    });
  }
  return json(res, 404, { error: "not_found" });
});

server.listen(3101, () => {
  console.log("API server listening on http://localhost:3101");
});
