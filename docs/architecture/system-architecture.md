# Technical Architecture - Web3 Hot Topic X Matrix

## 1. Goal and Non-Goals

### Goal

Build a system that continuously collects recent Web3 and blockchain hot topics, generates high-quality X posts, reduces obvious AI tone, reviews content, and publishes through multiple isolated X accounts managed from one control plane.

### Phase 1 Non-Goals

- Automatic reply/engagement bots
- Multi-platform publishing beyond X
- Autonomous trading, token promotion, or airdrop automation
- Full self-learning feedback loops without human review on high-risk accounts

## 2. Architecture Principles

1. Source-first freshness: all candidate topics must carry source URL, capture time, and dedup fingerprint.
2. Account isolation: prompts, credentials, quotas, and risk state are isolated per account.
3. Pipeline determinism: every content item moves through explicit stages with idempotent jobs.
4. Human override: high-risk items and account actions require manual approval.
5. Boring stack: use mature TypeScript services, Postgres, Redis, and standard queue/workflow tooling.

## 3. Recommended Stack

| Area | Choice | Version | Rationale |
|---|---|---:|---|
| Runtime | Node.js | 22 LTS | Stable ecosystem for APIs, scraping, queue workers, and X SDK integration |
| Language | TypeScript | 5.6+ | Shared types across API, workers, and admin UI |
| API / Admin backend | NestJS | 11.x | Opinionated modules, queues, validation, testing, and clear service boundaries |
| Admin frontend | Next.js | 15.x | Fast internal dashboard and API-adjacent deployment |
| Database | PostgreSQL | 16.x | Relational workflow state, JSONB for source payloads, strong indexing |
| Queue | BullMQ + Redis | BullMQ 5.x / Redis 7.x | Reliable job orchestration with retries and delayed execution |
| Scheduler | Temporal optional later; phase 1 use Nest cron + BullMQ | n/a | Lower setup cost for MVP; easy migration path later |
| Browser fetch | Playwright | 1.54+ | Dynamic page collection and anti-fragile scraping |
| HTML parsing | Cheerio | 1.x | Fast lightweight parsing where browser is unnecessary |
| LLM gateway | OpenAI Responses API | current stable | Unified generation, rewrite, moderation-style evaluation |
| Observability | OpenTelemetry + Grafana/Loki/Prometheus | stable | End-to-end job tracing and operational visibility |
| Auth secrets | Doppler or 1Password Connect; fallback env + KMS | stable | Centralized secret rotation |
| Containerization | Docker Compose for dev, Kubernetes for prod | stable | Simple local setup, scalable production rollout |

## 4. High-Level Components

1. Source Collector Service
   - Polls RSS, public APIs, curated websites, X trends/search endpoints where permitted, and manual seed lists
   - Normalizes raw signals into `topic_signal`

2. Topic Intelligence Service
   - Deduplicates, clusters, scores freshness/engagement relevance, and selects publishable topics

3. Content Pipeline Service
   - Runs briefing, generation, rewrite, review, and publish-preparation stages

4. Policy and Risk Service
   - Enforces banned topics, account policy, duplication thresholds, cooldowns, and escalation rules

5. Publisher Service
   - Manages X API submission, media upload, retries, and post-publication state sync

6. Account Control Service
   - Stores account-level strategy, posting windows, voice profile, credentials reference, and risk posture

7. Admin Console
   - Human review queue, account dashboards, failure drill-down, and source configuration

## 5. Phase 1 Source Coverage

### Preferred source classes

1. RSS/news
   - CoinDesk
   - Cointelegraph
   - The Block
   - Decrypt
   - Binance Blog
   - official L1/L2 ecosystem blogs

2. Public structured feeds
   - CryptoPanic API
   - Reddit public JSON for selected subreddits
   - GitHub release feeds for tracked protocols

3. Curated X signal ingestion
   - Track trusted influencer lists, project accounts, and keyword searches through compliant APIs or approved third-party data providers

4. Optional market metadata
   - CoinGecko trending/search endpoints
   - DefiLlama protocol/news metadata

### Source selection rules

- Every source must be tagged with reliability tier, fetch method, rate limit, and allowed usage note.
- Do not scrape pages that explicitly forbid automated access in their terms.
- X raw ingestion should prefer official APIs or licensed providers; do not build against fragile private endpoints.

## 6. Pipeline Flow

### Stage A: Ingestion

1. Scheduler enqueues source poll jobs by source cadence.
2. Collector fetches raw items and stores payload snapshot.
3. Normalizer extracts title, summary, author, published time, URL, entities, and topic tags.

### Stage B: Topic Selection

1. Fingerprint by canonical URL + normalized title hash.
2. Cluster semantically similar items.
3. Score by:
   - freshness
   - source reliability
   - mention frequency
   - relevance to account strategy
   - novelty versus already posted content
4. Promote top signals to `topic_candidate`.

### Stage C: Content Briefing

1. Build concise factual brief from source evidence only.
2. Extract claims that require attribution.
3. Add account persona and language style constraints.

### Stage D: Generation

1. Generate 3-5 candidate posts per topic/account.
2. Enforce hard format constraints:
   - X character budget
   - optional CTA rules
   - no unsupported price claims
   - required attribution when factual claim is direct

### Stage E: De-AI Rewrite

1. Rewrite chosen candidate with account-specific voice.
2. Reduce repetitive structures, generic hype phrases, and templated transitions.
3. Preserve factual claims and mandatory source anchors.

### Stage F: Review

1. Automated review:
   - factual support check against source brief
   - moderation/policy screen
   - brand voice screen
   - duplication screen against recent posts
   - shill/scam risk heuristics
2. Human review only when:
   - account risk tier is high
   - topic mentions token price predictions
   - confidence score is below threshold
   - rewrite drifted from source facts

### Stage G: Publish

1. Publisher submits post to X.
2. Store response IDs and publish timestamp.
3. Trigger post-performance sync jobs.

## 7. De-AI-Tone Strategy

Phase 1 should avoid claiming perfect AI detection. Use a practical rewrite and review loop:

1. Voice pack per account
   - vocabulary preferences
   - banned phrases
   - stance style
   - emoji density
   - sentence rhythm examples

2. Rewrite prompt inputs
   - approved factual brief
   - negative phrase list
   - target style examples from historical human-written posts

3. AI-tone heuristics
   - repeated openings
   - overuse of “bullish”, “game-changer”, “in the ever-evolving”
   - symmetric sentence structures
   - generic concluding CTA

4. Similarity guard
   - compare to prior outputs via embeddings and n-gram overlap
   - reject if too close to recent matrix posts

## 8. Review and Risk Controls

### Content risk categories

- factual hallucination
- investment advice / price prediction
- unauthorized promotion
- rumor without attribution
- duplicate campaign spam
- account impersonation or brand conflict

### Account-level controls

1. Daily post quota
2. Minimum spacing between posts
3. Blacklist topics/keywords
4. Manual approval mode toggle
5. Region/time-window constraints
6. Cooldown after failed publish or warning event

### Operational controls

1. Audit trail for every prompt, output, review decision, and publish event
2. Kill switch per account and global
3. Secret isolation per account credential
4. Separate queue namespace per environment

## 9. X Integration

### Recommended approach

- Use X API through a dedicated publisher adapter.
- Prefer OAuth 2.0 / app-managed credentials stored outside source control.
- Encapsulate all X-specific logic inside `publisher-x` module.

### Publish capabilities for phase 1

1. text post publish
2. optional image attach
3. scheduled publish time
4. idempotent retry with publish request key
5. post status sync

### Avoid in phase 1

- automated replies
- DMs
- high-frequency posting patterns
- unofficial browser automation for posting

## 10. Multi-Account Isolation Model

Each account gets:

1. account profile
2. posting policy
3. persona prompt pack
4. source/topic weighting profile
5. publish credentials reference
6. review threshold
7. usage metrics and risk counters

Isolation rules:

- One account cannot read another account's raw credentials.
- Jobs carry `account_id` and are authorized against policy snapshots.
- Prompt templates are shared, but persona variables are account-scoped.
- One bad account state must not stop unrelated accounts unless global kill switch is triggered.

## 11. Service Boundaries

### `apps/api-admin`

- internal REST API for dashboard
- authentication and RBAC
- task/query endpoints

### `apps/web-admin`

- Next.js dashboard for operations
- review queue
- account and source management

### `apps/worker-pipeline`

- ingestion jobs
- clustering jobs
- generation/rewrite/review jobs

### `packages/domain`

- shared types
- enums
- validation schemas

### `packages/publisher-x`

- X API adapter
- media upload
- publish retry logic

### `packages/llm-gateway`

- prompt templates
- model routing
- output schema validation

### `packages/risk-engine`

- policy rules
- score calculators
- duplication detection

## 12. Data Model

### Core tables

#### `sources`

- `id` uuid pk
- `name` text unique not null
- `type` text not null
- `base_url` text null
- `fetch_strategy` text not null
- `cadence_minutes` int not null
- `reliability_tier` smallint not null
- `enabled` boolean not null default true
- `config_json` jsonb not null
- `created_at` timestamptz not null

#### `source_items`

- `id` uuid pk
- `source_id` uuid fk
- `external_id` text null
- `canonical_url` text not null
- `title` text not null
- `summary` text null
- `author_name` text null
- `published_at` timestamptz null
- `raw_payload` jsonb not null
- `content_hash` text not null
- `ingested_at` timestamptz not null
- unique index on (`source_id`, `content_hash`)

#### `topic_candidates`

- `id` uuid pk
- `cluster_key` text not null
- `primary_source_item_id` uuid fk
- `topic_label` text not null
- `entities_json` jsonb not null
- `score_total` numeric(6,3) not null
- `score_freshness` numeric(6,3) not null
- `score_relevance` numeric(6,3) not null
- `score_novelty` numeric(6,3) not null
- `status` text not null
- `created_at` timestamptz not null

#### `accounts`

- `id` uuid pk
- `name` text unique not null
- `handle` text unique not null
- `status` text not null
- `risk_tier` text not null
- `timezone` text not null
- `daily_quota` int not null
- `min_interval_minutes` int not null
- `credentials_ref` text not null
- `created_at` timestamptz not null

#### `account_personas`

- `id` uuid pk
- `account_id` uuid fk unique
- `tone_rules` jsonb not null
- `banned_phrases` jsonb not null
- `style_examples` jsonb not null
- `review_thresholds` jsonb not null
- `updated_at` timestamptz not null

#### `content_jobs`

- `id` uuid pk
- `topic_candidate_id` uuid fk
- `account_id` uuid fk
- `stage` text not null
- `status` text not null
- `attempt` int not null default 0
- `input_snapshot` jsonb not null
- `output_snapshot` jsonb null
- `error_snapshot` jsonb null
- `created_at` timestamptz not null
- `updated_at` timestamptz not null

#### `content_variants`

- `id` uuid pk
- `content_job_id` uuid fk
- `variant_type` text not null
- `body_text` text not null
- `char_count` int not null
- `fact_score` numeric(5,2) null
- `ai_tone_score` numeric(5,2) null
- `duplication_score` numeric(5,2) null
- `selected` boolean not null default false
- `created_at` timestamptz not null

#### `review_decisions`

- `id` uuid pk
- `content_variant_id` uuid fk
- `review_type` text not null
- `decision` text not null
- `score` numeric(5,2) null
- `reasons_json` jsonb not null
- `reviewed_by` text not null
- `created_at` timestamptz not null

#### `publish_events`

- `id` uuid pk
- `account_id` uuid fk
- `content_variant_id` uuid fk
- `provider` text not null
- `provider_post_id` text null
- `idempotency_key` text not null
- `status` text not null
- `scheduled_for` timestamptz null
- `published_at` timestamptz null
- `response_json` jsonb null
- `created_at` timestamptz not null

#### `account_risk_events`

- `id` uuid pk
- `account_id` uuid fk
- `event_type` text not null
- `severity` text not null
- `details_json` jsonb not null
- `created_at` timestamptz not null

## 13. Key APIs

### Admin

`GET /api/v1/accounts`

Response:

```json
[
  {
    "id": "uuid",
    "name": "Alpha News",
    "handle": "@alpha",
    "status": "active",
    "riskTier": "medium"
  }
]
```

`POST /api/v1/accounts`

```json
{
  "name": "Alpha News",
  "handle": "@alpha",
  "timezone": "UTC",
  "dailyQuota": 6,
  "minIntervalMinutes": 90,
  "credentialsRef": "vault://x/alpha"
}
```

`POST /api/v1/sources`

```json
{
  "name": "CoinDesk RSS",
  "type": "rss",
  "baseUrl": "https://www.coindesk.com/arc/outboundfeeds/rss/",
  "fetchStrategy": "rss",
  "cadenceMinutes": 15,
  "reliabilityTier": 2,
  "config": {}
}
```

`POST /api/v1/topics/:id/generate`

```json
{
  "accountIds": ["uuid"],
  "priority": "normal"
}
```

`POST /api/v1/reviews/:variantId/approve`

```json
{
  "reviewer": "ops@company.com",
  "note": "facts checked"
}
```

`POST /api/v1/publish/:variantId`

```json
{
  "accountId": "uuid",
  "scheduledFor": "2026-05-01T08:00:00Z"
}
```

## 14. Directory Structure Recommendation

```text
/workspace/project
├── apps/
│   ├── api-admin/
│   ├── web-admin/
│   └── worker-pipeline/
├── packages/
│   ├── domain/
│   ├── llm-gateway/
│   ├── publisher-x/
│   └── risk-engine/
├── infra/
│   ├── docker/
│   ├── k8s/
│   └── terraform/
├── docs/
│   └── architecture/
├── .github/
│   └── workflows/
└── package.json
```

## 15. Deployment Plan

### Environments

1. local
2. staging
3. production

### Local

- Docker Compose
- Postgres
- Redis
- one API service
- one worker service
- one admin web service

### Production

- Kubernetes
- managed Postgres
- managed Redis
- separate worker deployment with horizontal scaling
- object storage for media and raw snapshots if payloads grow
- centralized logs and traces

### Security

- Vault/KMS-backed secrets
- SSO for admin console
- encrypted audit exports
- IP-restricted admin access where possible

## 16. Repo Initialization Guidance

1. Initialize monorepo with `pnpm` workspaces.
2. Create NestJS app for `api-admin`.
3. Create NestJS app for `worker-pipeline`.
4. Create Next.js admin app for `web-admin`.
5. Add shared packages for domain types, prompts, and publisher adapter.
6. Add CI:
   - lint
   - typecheck
   - unit tests
   - migration checks
7. Add seed data for 3 accounts and 8 sources.

## 17. Phase 1 Implementation Path

### Sprint 1

1. Monorepo bootstrap
2. Postgres schema and migrations
3. Source registry CRUD
4. RSS/API ingestion worker
5. Topic dedup and scoring

### Sprint 2

1. Account/persona CRUD
2. Briefing and generation pipeline
3. Rewrite and review stages
4. Admin review queue

### Sprint 3

1. X publish adapter
2. Scheduling windows and quotas
3. Audit timeline
4. Observability dashboards

### Sprint 4

1. Multi-account risk controls
2. performance sync
3. prompt tuning from approved historical outputs
4. staging hardening and launch checklist

## 18. First Developer Tasks

1. Create monorepo skeleton and package manager config.
2. Add `sources`, `source_items`, `topic_candidates`, `accounts`, and `content_jobs` migrations.
3. Implement RSS/API collectors only.
4. Expose minimal admin endpoints for sources and accounts.
5. Build one end-to-end flow: ingest -> select -> generate -> review -> publish to sandbox account.

## 19. Key Decisions

1. Use TypeScript monorepo instead of polyglot services to reduce coordination cost.
2. Start with BullMQ scheduler instead of Temporal to keep phase 1 operational complexity low.
3. Use human review gates for medium/high-risk content rather than full autonomy.
4. Keep X integration behind one adapter to allow future platform expansion.
5. Model all stages in Postgres for traceability and replay.
