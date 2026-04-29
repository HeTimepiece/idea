function jaccard(a, b) {
  const setA = new Set(a.toLowerCase().split(/\W+/).filter(Boolean));
  const setB = new Set(b.toLowerCase().split(/\W+/).filter(Boolean));
  const overlap = [...setA].filter((token) => setB.has(token)).length;
  const union = new Set([...setA, ...setB]).size || 1;
  return overlap / union;
}

export function scoreMatrixSimilarity(variants) {
  const scores = [];
  for (let i = 0; i < variants.length; i += 1) {
    for (let j = i + 1; j < variants.length; j += 1) {
      const left = `${variants[i].hook} ${variants[i].body} ${variants[i].cta}`;
      const right = `${variants[j].hook} ${variants[j].body} ${variants[j].cta}`;
      scores.push({
        pair: [variants[i].id, variants[j].id],
        score: Number(jaccard(left, right).toFixed(2))
      });
    }
  }
  return scores;
}

export function evaluateSimilarityGate(variants, blockThreshold = 0.82, reviewThreshold = 0.72) {
  const scores = scoreMatrixSimilarity(variants);
  const observedVariantScore = variants.reduce(
    (max, variant) => Math.max(max, variant.similarityScore ?? 0),
    0
  );
  const pairwiseScore = scores.reduce((max, item) => Math.max(max, item.score), 0);
  const maxScore = Number(Math.max(observedVariantScore, pairwiseScore).toFixed(2));
  if (maxScore > blockThreshold) {
    return { decision: "blocked", maxScore, scores };
  }
  if (maxScore >= reviewThreshold) {
    return { decision: "manual_review", maxScore, scores };
  }
  return { decision: "pass", maxScore, scores };
}

export function evaluateAccountHealth(accounts) {
  const unhealthy = accounts.filter(
    (account) => account.health !== "healthy" || account.successRate24h < 0.8
  );
  return {
    decision: unhealthy.length ? "blocked" : "pass",
    unhealthy
  };
}

export function requiresHumanTakeover(eventCluster) {
  const hasTrustedEvidence = eventCluster.evidence.some((item) =>
    ["official", "trusted_media"].includes(item.kind)
  );
  return !hasTrustedEvidence || ["high", "critical"].includes(eventCluster.riskLevel);
}
