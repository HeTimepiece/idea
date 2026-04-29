import test from "node:test";
import assert from "node:assert/strict";
import { advanceOrThrow, canTransition } from "../packages/domain/src/state-machines.mjs";

test("valid ingestion transition passes", () => {
  assert.equal(canTransition("ingestion", "fetching", "normalized"), true);
  assert.equal(advanceOrThrow("review", "machine_passed", "human_review_pending"), "human_review_pending");
});

test("invalid transition throws", () => {
  assert.throws(() => advanceOrThrow("publish", "approved", "published"));
});
