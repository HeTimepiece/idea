const transition = (map, current, next) => Boolean(map[current]?.includes(next));

const ingestionMap = {
  source_pending: ["fetching"],
  fetching: ["normalized", "fetch_failed", "source_degraded"],
  normalized: ["deduplicated", "normalize_failed"],
  deduplicated: ["clustered", "dedupe_failed"],
  clustered: ["analyzed_ready"]
};

const generationMap = {
  analyzed_ready: ["selected"],
  selected: ["drafting"],
  drafting: ["drafted", "draft_failed", "draft_timeout"],
  drafted: ["draft_scored"]
};

const humanizationMap = {
  drafted: ["humanizing"],
  humanizing: ["humanized", "humanize_failed"],
  humanized: ["humanized_verified", "fact_drift_blocked"]
};

const reviewMap = {
  humanized_verified: ["machine_reviewing"],
  machine_reviewing: ["machine_passed", "risk_blocked", "needs_revision"],
  machine_passed: ["human_review_pending"],
  human_review_pending: ["approved", "rejected", "needs_revision"],
  needs_revision: ["drafted", "humanized"]
};

const publishMap = {
  approved: ["scheduled"],
  scheduled: ["publishing", "manual_publish_pending"],
  publishing: ["published", "publish_failed", "partially_published"],
  publish_failed: ["retry_scheduled", "manual_publish_pending"],
  retry_scheduled: ["publishing"],
  published: ["metrics_syncing"],
  metrics_syncing: ["closed"]
};

export function canTransition(machine, current, next) {
  const maps = {
    ingestion: ingestionMap,
    generation: generationMap,
    humanization: humanizationMap,
    review: reviewMap,
    publish: publishMap
  };
  return transition(maps[machine], current, next);
}

export function advanceOrThrow(machine, current, next) {
  if (!canTransition(machine, current, next)) {
    throw new Error(`Invalid ${machine} transition: ${current} -> ${next}`);
  }
  return next;
}
