// NEWS AGGREGATOR API
import type { Context } from "hono";

const newsCache: any[] = [];

export const cryptoNews = async (c: Context) => {
  return c.json({
    articles: [
      { title: "Bitcoin Hits New High", source: "CoinDesk", published: new Date().toISOString() },
      { title: "Ethereum 2.0 Update", source: "Cointelegraph", published: new Date().toISOString() }
    ],
    timestamp: new Date().toISOString()
  });
};

export const techNews = async (c: Context) => {
  return c.json({
    articles: [
      { title: "AI Breakthrough in 2026", source: "TechCrunch", published: new Date().toISOString() },
      { title: "New iPhone Released", source: "The Verge", published: new Date().toISOString() }
    ],
    timestamp: new Date().toISOString()
  });
};

export const marketNews = async (c: Context) => {
  return c.json({
    articles: [
      { title: "S&P 500 Rally", source: "Bloomberg", published: new Date().toISOString() },
      { title: "Fed Rate Decision", source: "Reuters", published: new Date().toISOString() }
    ],
    timestamp: new Date().toISOString()
  });
};
