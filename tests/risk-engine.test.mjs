import test from "node:test";
import assert from "node:assert/strict";
import { accountMatrix, contentJobs, eventClusters } from "../packages/domain/src/mock-data.mjs";
import {
  evaluateAccountHealth,
  evaluateSimilarityGate,
  requiresHumanTakeover
} from "../packages/risk-engine/src/index.mjs";

test("similarity gate requires manual review when a score enters the review band", () => {
  const result = evaluateSimilarityGate(contentJobs[0].variants);
  assert.equal(result.decision, "manual_review");
  assert.ok(result.maxScore >= 0.72);
});

test("account health gate blocks unhealthy accounts", () => {
  const result = evaluateAccountHealth(accountMatrix);
  assert.equal(result.decision, "blocked");
  assert.equal(result.unhealthy.length, 1);
});

test("trusted evidence and medium risk do not force takeover", () => {
  assert.equal(requiresHumanTakeover(eventClusters[0]), false);
});
