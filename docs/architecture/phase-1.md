# Phase 1 Architecture

## Scope

第一阶段提供可运行骨架，不直接接入真实 X 发布，而是保留发布器边界与门禁约束。

## Core Object Model

- `EventCluster`: 事件聚类主对象，聚合实体、叙事、证据、热度与分析状态
- `ContentJob`: 从事件派生的内容生产工作对象
- `DraftVariant`: 面向 persona 的差异化版本
- `HumanizedDraft`: 去 AI 味后的可审版本
- `ReviewRecord`: 机器审核与人工终审统一记录
- `PublishJob`: 发布计划对象，携带目标账号、排程、门禁与重试状态

## State Machines

- Ingestion: `source_pending -> fetching -> normalized -> deduplicated -> clustered -> analyzed_ready`
- Generation: `analyzed_ready -> selected -> drafting -> drafted -> draft_scored`
- Humanization: `drafted -> humanizing -> humanized -> humanized_verified`
- Review: `humanized_verified -> machine_reviewing -> machine_passed -> human_review_pending -> approved`
- Publishing: `approved -> scheduled -> publishing -> published -> metrics_syncing -> closed`

## Risk Gates

- similarity gate: embedding / simhash / structure 三层评分，`> 0.82` 阻断
- account health gate: 限流、冻结、近 24h 成功率过低一律阻断
- evidence gate: 没有 `official` 或 `trusted_media` 证据时强制人工接管

## UI Areas

- Hot Topic Board
- Event Detail / Evidence
- Content Workflow
- Review Queue
- Account Matrix
- Publish Schedule
- Audit & Trace
