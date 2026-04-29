# wanman Web3/X Matrix MVP

第一阶段实现骨架，围绕 CTO 技术蓝图落地一条可运行的受控流水线：

`source -> event cluster -> analysis -> persona draft variants -> humanized drafts -> machine review -> human review -> publish job`

当前仓库重点覆盖：

- 事件对象模型、五段状态机和统一枚举
- 多源采集模拟连接器与热点归一
- persona 差异化生成、去 AI 味、审核链、相似度/账号健康门禁
- X 账号矩阵数据模型与基础管理界面
- API、worker、静态运营控制台三端骨架

## Monorepo 结构

```text
apps/
  api/      HTTP API，返回第一阶段 mock domain 数据
  web/      控制台页面，映射热点、工作流、审核、账号矩阵、排程
  worker/   模拟采集到发布前的异步流水线
packages/
  connectors/  CoinGecko/CryptoPanic/RSS 模拟连接器
  database/    Prisma schema
  domain/      枚举、状态机、示例数据、persona 规则
  risk-engine/ 相似度与账号健康门禁
docs/
  architecture/phase-1.md
```

## 快速启动

不依赖额外 npm 包，Node `22+` 即可直接运行：

```bash
cd /workspace/project
npm run dev:api
```

新终端启动控制台：

```bash
cd /workspace/project
npm run dev:web
```

可选运行 worker 模拟一次主链路：

```bash
cd /workspace/project
npm run dev:worker
```

运行测试：

```bash
cd /workspace/project
npm test
```

## 访问地址

- API: `http://localhost:3101/api/v1/overview`
- Web: `http://localhost:3100`

## 已实现的第一阶段约束

1. 所有内容对象都可回溯到 `EventCluster` 与 `Evidence`
2. `draft -> humanized -> review -> publish` 链路默认强制人工终审
3. 发布前必须通过相似度门禁与账号健康门禁
4. 生成器按 `flash`、`research_insight`、`community_voice`、`risk_watch`、`regional_operator` 做 persona 差异化
5. 支持人工接管标识、失败重试意图与审计字段

## 设计稿说明

本次任务要求参考 designer 产出的 `design_mockup` 与 `spec.md`。当前挂载工作区未发现对应文件，因此界面按 CTO 蓝图中的信息架构与状态可视化要求实现，并在任务报告中记录该缺口。
