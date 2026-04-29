import { sources } from "../../domain/src/mock-data.mjs";

export function fetchCoinGeckoTrending() {
  return {
    source: sources[0],
    items: [
      {
        title: "Berachain ecosystem search volume climbs",
        url: "https://example.org/coingecko/berachain",
        publishedAt: "2026-04-29T08:49:00Z"
      }
    ]
  };
}

export function fetchCryptoPanicNews() {
  return {
    source: sources[1],
    items: [
      {
        title: "Analysts discuss Berachain DeFi rotation",
        url: "https://example.org/cryptopanic/bera",
        publishedAt: "2026-04-29T08:54:00Z"
      }
    ]
  };
}

export function fetchOfficialRss() {
  return {
    source: sources[2],
    items: [
      {
        title: "Berachain posts incentive update",
        url: "https://example.org/official/bera-update",
        publishedAt: "2026-04-29T08:50:00Z"
      }
    ]
  };
}

export function syncAllSources() {
  return [fetchCoinGeckoTrending(), fetchCryptoPanicNews(), fetchOfficialRss()];
}
