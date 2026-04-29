# Web3/Blockchain Content Matrix System PRD

## 1. Product Decision

Build an MVP system that continuously collects fresh Web3/blockchain trending topics, turns them into platform-ready X content through a multi-stage AI pipeline, and operates multiple X accounts as a managed publishing matrix with risk controls and review gates.

The MVP optimizes for:

- Faster topic-to-post turnaround
- Higher publish consistency across multiple accounts
- Lower account-level compliance and repetition risk
- Human-manageable review and operations workload

## 2. Problem Statement

Operators who run crypto content accounts on X face three bottlenecks:

- Finding timely, high-signal topics fast enough
- Producing enough differentiated content without obvious AI tone
- Managing multiple accounts safely without losing control of publishing quality

Current workflows are manual, fragmented, and hard to scale. Topic discovery, writing, editing, review, and posting are often done in separate tools with weak traceability.

## 3. Goals and Non-Goals

### Goals

1. Aggregate latest Web3/blockchain hot topics from configurable sources.
2. Convert selected topics into publishable X posts through generation, de-AI rewriting, and AI review.
3. Support multi-account content planning and publishing from one console.
4. Provide role-based controls and auditability for content decisions.
5. Launch an MVP that can prove end-to-end throughput and account management viability.

### Non-Goals for MVP

- Full autonomous growth optimization based on follower/revenue outcomes
- Cross-platform publishing beyond X
- Fully automatic posting without any review gate
- Deep on-chain data analysis or original market research generation
- Sophisticated CRM, ad buying, or paid campaign management

## 4. Target Users

### Primary User

Web3 content operators or small growth teams managing 3-20 X accounts focused on crypto news, narratives, project commentary, or educational content.

Core needs:

- Rapidly identify what is trending now
- Publish at scale while preserving account differentiation
- Reduce content quality variance and compliance mistakes

### Secondary Users

- Agency operators serving multiple Web3 brands
- Founders or solo operators running a content matrix
- Internal reviewers responsible for brand and risk checks

## 5. User Value Proposition

“From hot topic detection to reviewed multi-account publishing in one system, with enough variation and guardrails to scale a content matrix without obvious AI spam patterns.”

## 6. Key User Scenarios

1. An operator opens the dashboard and sees fresh trending items ranked by source strength, recency, and topic momentum.
2. The operator selects a trend and generates multiple post candidates for different account personas.
3. The system rewrites drafts to reduce generic AI phrasing and repetitive structure.
4. The system reviews drafts for factual risk, banned claims, duplication, and account-fit issues.
5. The operator approves and schedules posts to multiple X accounts with account-level customization.
6. The operator monitors publish results, failures, and review exceptions.

## 7. Product Scope

## 7.1 End-to-End Core Flow

1. Trend collection
   - Pull trending items from configured Web3/blockchain sources
   - Normalize title, summary, source URL, timestamp, tags, and source type
   - Deduplicate similar items
2. Topic triage
   - Score by freshness, engagement potential, and topic relevance
   - Let operator shortlist items for content production
3. AI content generation
   - Generate multiple X-ready drafts per selected topic
   - Support account persona, tone, language, CTA, and format preferences
4. De-AI rewriting
   - Rewrite drafts to reduce formulaic tone, repeated hooks, and generic wording
   - Preserve factual anchors and account persona
5. AI review
   - Check for unsupported claims, obvious hallucinations, duplicated copy, risky wording, prohibited content patterns, and tone mismatch
   - Produce pass/fail plus revision suggestions
6. Human approval
   - Operator or reviewer approves, rejects, or edits before publishing
7. X publishing
   - Publish immediately or schedule later
   - Support per-account content variants and publishing logs
8. Matrix operations
   - Manage accounts, personas, limits, queue status, posting cadence, and exception handling centrally

## 7.2 Roles and Permissions

### Admin

- Manage workspace, members, source configuration, X account bindings, and global policies
- View all content and logs
- Override review and publishing controls

### Operator

- Collect/select trends
- Trigger generation and rewrite flows
- Create schedules and submit content for approval
- View account performance and task status

### Reviewer

- Review AI outputs
- Approve/reject/edit content
- Flag compliance or quality risks
- View audit history

### Analyst (Optional MVP-light Role)

- View trend data, content logs, and publishing performance
- No editing or publishing permissions

MVP permission rule:

- Admin and Operator are required
- Reviewer is required if human approval is separated from operation
- Analyst can be view-only and optional

## 8. Functional Requirements

### 8.1 Trend Collection

- Configure multiple Web3/blockchain sources
- Ingest latest items on a recurring schedule
- Tag by source, topic type, language, and publish time
- Deduplicate near-identical items
- Show source traceability for every trend

### 8.2 Topic Workbench

- Display trend list with filters for recency, source, tag, status
- Allow manual selection and “generate content” trigger
- Store topic status: new, shortlisted, generating, reviewed, scheduled, published, rejected

### 8.3 Content Generation

- Generate at least 3 candidate X posts per topic
- Support account persona prompt templates
- Support short post and thread-starter formats
- Record prompt version and model stage metadata

### 8.4 De-AI Rewriting

- Rewrite drafts while preserving topic facts and intended stance
- Detect and reduce repetitive structures across variants
- Provide before/after comparison

### 8.5 AI Review

- Review against configurable checklist:
  - factual certainty risk
  - policy/risk keywords
  - spamminess or over-promotion
  - duplicated content similarity
  - account persona mismatch
- Return structured score and actionable failure reasons

### 8.6 Multi-Account Matrix Management

- Manage X account profile metadata, persona, status, and posting cadence
- Map one topic to multiple account variants
- Prevent same copy from being published unchanged across several accounts
- Track account-level publish history and failures

### 8.7 Publishing

- Connect X accounts through secure credentials/tokens
- Support immediate publish and scheduled queue
- Persist publish result, failure reason, and post URL

### 8.8 Audit and Operations

- Maintain action log for generation, edit, approval, and publish steps
- Record who approved what and when
- Surface failed jobs and blocked content clearly

## 9. Key Pages

1. Dashboard
   - Trend volume, pipeline status, pending reviews, publish success rate, account health
2. Trend Feed
   - Latest collected items, filters, source traceability, shortlist actions
3. Topic Detail / Content Studio
   - Topic context, generated variants, rewrite results, review results, edit box
4. Review Queue
   - Pending approvals, rejection reasons, risk signals, bulk actions
5. Publish Queue / Calendar
   - Scheduled posts, publish state, retry options, per-account queue view
6. Account Matrix Management
   - Account list, persona settings, status, cadence, permissioned actions
7. Settings
   - Source config, prompt policy, review rules, role management, integrations

## 10. MVP Definition

### Must Have

- Scheduled trend ingestion from a small set of sources
- Trend list with deduplication and manual selection
- Draft generation for X posts
- De-AI rewrite stage
- AI review with pass/fail result and reasons
- Human approval before publish
- Multi-account management for at least 3 accounts
- Immediate publish and scheduled publish to X
- Basic audit log and job status tracking

### Should Have

- Persona-based prompt presets by account
- Duplicate-content similarity warnings across accounts
- Simple publish calendar

### Excluded from MVP

- Autonomous topic selection and autonomous posting
- Cross-platform publishing
- Full analytics attribution and growth recommendations
- Advanced A/B testing
- Fine-grained brand safety policy engine beyond core rules

## 11. Success Metrics

### Product Metrics

- Median time from trend capture to approved draft <= 15 minutes
- Median time from approved draft to scheduled publish <= 5 minutes
- Publish success rate >= 95%
- Human approval pass rate after rewrite >= 60% within first stable prompt version

### Quality/Risk Metrics

- Duplicate publish incidents across accounts < 5% of total publishes
- AI review false negative rate tracked manually and reduced release over release
- Content rejection reasons fully traceable for 100% of rejected drafts

### Operational Metrics

- One operator can manage at least 10 accounts in MVP workflow
- At least 20 publishable posts/day processed through the system without manual copy-paste outside platform

## 12. Risks and Mitigations

### Platform Risk

X account restrictions, credential issues, or anti-spam controls may block posting.

Mitigation:

- Per-account rate control
- Retry and failure logging
- Content variance enforcement
- Manual approval gate in MVP

### Content Quality Risk

AI may hallucinate, overstate facts, or sound repetitive.

Mitigation:

- Source traceability
- Rewrite stage with structure variation
- AI review checklist
- Human approval before publish

### Operational Complexity Risk

Multi-account workflows can become hard to manage if status is unclear.

Mitigation:

- Explicit pipeline states
- Queue views
- Audit log
- Account-level status and filters

## 13. Acceptance Criteria

### End-to-End Flow

1. Given a configured source set, the system ingests new Web3/blockchain items on schedule and shows them in the trend feed with source and timestamp.
2. Given a selected trend, an operator can generate at least 3 X draft candidates.
3. Given generated drafts, the system can produce rewritten variants intended to reduce obvious AI style.
4. Given rewritten drafts, the review service returns pass/fail and named reasons.
5. Given an approved draft, an operator can assign it to one or more X accounts with account-level variants.
6. Given a scheduled or immediate publish action, the system records publish status and resulting post URL or failure reason.

### Permissions

1. Only Admin can manage role permissions and integration settings.
2. Operator can generate/edit/schedule but cannot change workspace-level permissions.
3. Reviewer can approve/reject/edit content but cannot manage account credentials unless also Admin.

### Quality Controls

1. The system warns when two account drafts are materially too similar.
2. Every published item can be traced back to topic, generation stage, review stage, approver, and account.
3. Rejected drafts retain failure reasons and remain searchable.

## 14. Release Recommendation

Ship MVP as an operator-assisted system, not a fully autonomous agent. The first release should optimize reliability, traceability, and usable throughput before attempting aggressive automation.

## 15. Development Task Breakdown

### Phase 1: Foundation

1. Initialize repository structure under `docs/product` and corresponding app modules.
2. Define core domain models: source, trend item, topic, content draft, review result, account, publish job, audit log.
3. Define RBAC model and workflow states.

### Phase 2: Trend Pipeline

1. Implement source connector framework and scheduler.
2. Implement normalization and deduplication.
3. Build trend feed API and UI.

### Phase 3: Content Pipeline

1. Implement generation service with prompt templates.
2. Implement de-AI rewrite service.
3. Implement AI review service with structured results.
4. Persist stage outputs and model metadata.

### Phase 4: Matrix Operations

1. Implement X account management and secure credential handling.
2. Implement per-account persona configuration.
3. Implement duplicate-content warning logic.
4. Implement publish queue and scheduler.

### Phase 5: Human Review and Audit

1. Build review queue UI.
2. Add approval/rejection/edit actions.
3. Add audit log and job observability.

### Phase 6: Stabilization

1. Add integration tests for ingest-to-publish path.
2. Add rate limiting and failure recovery.
3. Tune prompts and review thresholds using real operator feedback.

## 16. Recommended Next Engineering Tickets

1. `docs/product` 基线: create product docs index plus structured PRD summary.
2. Domain schema ticket: define entities, status enums, and relations for trend/content/publish pipeline.
3. Trend ingestion ticket: first two or three source connectors plus scheduler.
4. Content pipeline ticket: generation, rewrite, and review interfaces with persistence.
5. X integration ticket: account connection, publish job execution, and logging.
6. Backoffice UI ticket: dashboard, trend feed, content studio, review queue, account management.
7. Risk control ticket: duplicate detection, publish throttling, audit trail.

## 17. Open Decisions for Future Iteration

1. Which trend sources should be first-party supported in V1
2. Whether one workspace can host unrelated client brands or only one matrix strategy
3. Whether thread generation is in MVP or postponed after single-post quality stabilizes
4. Whether account analytics and learning loops are part of V1.1 or later
