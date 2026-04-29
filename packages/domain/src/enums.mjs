export const ingestionStates = [
  "source_pending",
  "fetching",
  "normalized",
  "deduplicated",
  "clustered",
  "analyzed_ready",
  "fetch_failed",
  "normalize_failed",
  "dedupe_failed",
  "source_degraded"
];

export const generationStates = [
  "selected",
  "drafting",
  "drafted",
  "draft_scored",
  "draft_failed",
  "draft_timeout"
];

export const humanizationStates = [
  "humanizing",
  "humanized",
  "humanized_verified",
  "humanize_failed",
  "fact_drift_blocked"
];

export const reviewStates = [
  "machine_reviewing",
  "machine_passed",
  "human_review_pending",
  "approved",
  "risk_blocked",
  "rejected",
  "needs_revision"
];

export const publishStates = [
  "scheduled",
  "publishing",
  "published",
  "metrics_syncing",
  "closed",
  "publish_failed",
  "retry_scheduled",
  "manual_publish_pending",
  "partially_published"
];

export const personaTypes = [
  "flash",
  "research_insight",
  "community_voice",
  "risk_watch",
  "regional_operator"
];

export const riskLevels = ["low", "medium", "high", "critical"];
