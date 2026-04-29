const el = (selector) => document.querySelector(selector);

function renderTopics(events) {
  el("#topicsGrid").innerHTML = events
    .map(
      (event) => `
        <article class="topic-card">
          <div class="badge">${event.eventType}</div>
          <h4>${event.canonicalTitle}</h4>
          <p class="muted">Importance ${event.importanceScore} / Risk ${event.riskLevel}</p>
          <p>${event.analysisReport.summary}</p>
          <p class="muted">Evidence: ${event.evidence.map((item) => item.kind).join(", ")}</p>
        </article>
      `
    )
    .join("");
}

function renderTrace(trace) {
  el("#trace").innerHTML = trace
    .map((step) => `<span class="trace-step">${step}</span>`)
    .join("");
}

function renderVariants(variants) {
  el("#variants").innerHTML = variants
    .map(
      (variant) => `
        <article class="variant">
          <div class="badge">${variant.personaType}</div>
          <h4>${variant.hook}</h4>
          <p>${variant.body}</p>
          <p class="muted">${variant.cta}</p>
          <p class="${variant.similarityScore >= 0.72 ? "warn" : "ok"}">
            Similarity ${variant.similarityScore}
          </p>
        </article>
      `
    )
    .join("");
}

function renderReview(review) {
  el("#reviewCard").innerHTML = `
    <p><strong>Decision:</strong> ${review.decision}</p>
    <p><strong>Reason:</strong> ${review.reason}</p>
    <p><strong>Fact Check:</strong> ${review.factCheckStatus}</p>
    <p><strong>X Policy Risk:</strong> ${review.xPolicyRiskStatus}</p>
    <p><strong>Matrix Similarity:</strong> ${review.matrixSimilarityStatus}</p>
  `;
}

function renderAccounts(accounts) {
  el("#accountsGrid").innerHTML = accounts
    .map(
      (account) => `
        <article class="account">
          <div class="badge">${account.personaType}</div>
          <h4>${account.handle}</h4>
          <p class="${account.health === "healthy" ? "ok" : "warn"}">Health: ${account.health}</p>
          <p class="muted">Audience: ${account.audienceSegment}</p>
          <p class="muted">Region: ${account.region} / ${account.language}</p>
          <p>Similarity threshold ${account.similarityThreshold}</p>
        </article>
      `
    )
    .join("");
}

function renderPublishing(data) {
  el("#publishingCard").innerHTML = `
    <article class="publish-item">
      <h4>Similarity Gate</h4>
      <p><strong>${data.similarityGate.decision}</strong> / max ${data.similarityGate.maxScore}</p>
      <p class="muted">${data.similarityGate.scores.map((item) => item.pair.join(" vs ") + ": " + item.score).join(" | ")}</p>
    </article>
    <article class="publish-item">
      <h4>Account Health Gate</h4>
      <p><strong>${data.accountGate.decision}</strong></p>
      <p class="muted">Manual takeover: ${data.manualTakeover ? "required" : "not required"}</p>
      <p class="muted">Publish state: ${data.contentJob.publishJob.status}</p>
    </article>
  `;
}

fetch("http://localhost:3101/api/v1/overview")
  .then((response) => response.json())
  .then((data) => {
    el("#gateDecision").textContent =
      data.similarityGate.decision === "pass" && data.accountGate.decision === "pass"
        ? "Ready after human approval"
        : "Blocked / manual takeover";
    el("#gateMeta").textContent = `Similarity ${data.similarityGate.maxScore} / Account gate ${data.accountGate.decision}`;
    el("#sourceCount").textContent = `${data.sources.length} active sources`;
    renderTopics(data.events);
    renderTrace(data.contentJob.trace);
    renderVariants(data.contentJob.variants);
    renderReview(data.contentJob.review);
    renderAccounts(data.accounts);
    renderPublishing(data);
  })
  .catch((error) => {
    el("#gateDecision").textContent = "API offline";
    el("#gateMeta").textContent = error.message;
  });
