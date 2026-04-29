export const sources = [
  {
    id: "src-coingecko",
    name: "CoinGecko Trending",
    type: "market",
    status: "healthy",
    priority: 1
  },
  {
    id: "src-cryptopanic",
    name: "CryptoPanic",
    type: "news",
    status: "healthy",
    priority: 1
  },
  {
    id: "src-rss-official",
    name: "Official RSS Whitelist",
    type: "rss",
    status: "healthy",
    priority: 2
  }
];

export const accountMatrix = [
  {
    id: "acc-1",
    handle: "@alpha_flash",
    personaType: "flash",
    audienceSegment: "traders",
    health: "healthy",
    successRate24h: 0.94,
    similarityThreshold: 0.72,
    language: "en",
    region: "global",
    bannedPhrases: ["guaranteed gains", "100x soon"]
  },
  {
    id: "acc-2",
    handle: "@depth_research",
    personaType: "research_insight",
    audienceSegment: "analysts",
    health: "healthy",
    successRate24h: 0.91,
    similarityThreshold: 0.7,
    language: "en",
    region: "us",
    bannedPhrases: ["insider alpha"]
  },
  {
    id: "acc-3",
    handle: "@asia_ops_watch",
    personaType: "regional_operator",
    audienceSegment: "operators",
    health: "rate_limited",
    successRate24h: 0.52,
    similarityThreshold: 0.68,
    language: "zh",
    region: "apac",
    bannedPhrases: ["稳赚", "保本"]
  }
];

export const eventClusters = [
  {
    id: "evt-berachain",
    canonicalTitle: "Berachain mainnet incentives drive DeFi rotation narrative",
    eventType: "ecosystem_launch",
    status: "analyzed_ready",
    importanceScore: 88,
    riskLevel: "medium",
    firstSeenAt: "2026-04-29T08:50:00Z",
    lastSeenAt: "2026-04-29T09:12:00Z",
    entities: [
      { type: "chain", canonicalId: "chain-bera", name: "Berachain" },
      { type: "sector", canonicalId: "sector-defi", name: "DeFi" }
    ],
    narratives: [
      { code: "defi_rotation", label: "DeFi Rotation", confidence: 0.81 },
      { code: "airdrop_watch", label: "Airdrop Watch", confidence: 0.74 }
    ],
    evidence: [
      {
        sourceId: "src-rss-official",
        kind: "official",
        url: "https://example.org/berachain-update",
        publishedAt: "2026-04-29T08:50:00Z"
      },
      {
        sourceId: "src-cryptopanic",
        kind: "trusted_media",
        url: "https://example.org/media-cover",
        publishedAt: "2026-04-29T08:54:00Z"
      }
    ],
    analysisReport: {
      summary: "资金与情绪向新主网生态轮动，叙事集中在流动性激励与早期协议占位。",
      keyEntities: ["Berachain", "DeFi", "liquidity incentives"],
      sentiment: "positive",
      viralityScore: 77,
      riskLevel: "medium",
      recommendedAngles: [
        "用数据解释为什么轮动发生",
        "提示激励驱动后的可持续性风险",
        "面向不同账号拆分交易者与研究者视角"
      ],
      recommendedPersonaTypes: ["flash", "research_insight", "risk_watch"],
      confidenceNote: "官方公告与媒体二次报道一致",
      citationMap: {
        official: "https://example.org/berachain-update",
        media: "https://example.org/media-cover"
      }
    }
  }
];

export const contentJobs = [
  {
    id: "job-1",
    eventId: "evt-berachain",
    status: "human_review_pending",
    trace: [
      "source_pending",
      "fetching",
      "normalized",
      "deduplicated",
      "clustered",
      "analyzed_ready",
      "selected",
      "drafting",
      "drafted",
      "draft_scored",
      "humanizing",
      "humanized",
      "humanized_verified",
      "machine_reviewing",
      "machine_passed",
      "human_review_pending"
    ],
    variants: [
      {
        id: "var-1",
        accountId: "acc-1",
        personaType: "flash",
        hook: "New chain rotations are accelerating again.",
        body: "Berachain incentives are pulling attention from older DeFi pockets. Watch liquidity, not slogans.",
        cta: "Track whether TVL sticks after rewards normalize.",
        similarityScore: 0.61
      },
      {
        id: "var-2",
        accountId: "acc-2",
        personaType: "research_insight",
        hook: "Berachain is a useful case study in incentive-led ecosystem bootstrapping.",
        body: "The opportunity is not the headline itself but how emissions reshape short-term liquidity allocation and protocol discovery.",
        cta: "Review primary evidence before treating flows as durable demand.",
        similarityScore: 0.57
      },
      {
        id: "var-3",
        accountId: "acc-3",
        personaType: "regional_operator",
        hook: "亚太时段里，Berachain 生态热度明显抬升。",
        body: "如果你看的是运营窗口，重点不是喊单，而是哪些协议先拿到真实活跃度。",
        cta: "发布前需先确认账号限流状态。",
        similarityScore: 0.73
      }
    ],
    humanizedDrafts: [
      {
        id: "hum-1",
        variantId: "var-1",
        style: "lean",
        factConsistency: "pass"
      },
      {
        id: "hum-2",
        variantId: "var-2",
        style: "evidence-forward",
        factConsistency: "pass"
      }
    ],
    review: {
      factCheckStatus: "pass",
      linkWhitelistStatus: "pass",
      contractWhitelistStatus: "not_applicable",
      adDisclosureStatus: "pass",
      xPolicyRiskStatus: "warn",
      matrixSimilarityStatus: "review",
      decision: "human_review_pending",
      decidedBy: "machine",
      reason: "regional account exceeds manual review band and has health warning"
    },
    publishJob: {
      id: "pub-1",
      status: "manual_publish_pending",
      scheduledAt: "2026-04-29T11:30:00Z",
      targetAccountIds: ["acc-1", "acc-2", "acc-3"]
    }
  }
];
