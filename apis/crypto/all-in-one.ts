import type { Context } from "hono";

const CACHE = new Map<string, { data: any; ts: number }>();
const TTL = 60000;

async function cached(key: string, fetcher: () => Promise<any>) {
  const cached = CACHE.get(key);
  if (cached && Date.now() - cached.ts < TTL) return cached.data;
  const data = await fetcher();
  CACHE.set(key, { data, ts: Date.now() });
  return data;
}

// Bitcoin
export const bitcoin = async (c: Context) => {
  const data = await cached("btc", () => 
    fetch("https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd,gbp,eur,btc,eth&include_24hr_change=true&include_market_cap=true&include_24hr_vol=true").then(r => r.json())
  );
  return c.json({ symbol: "BTC", ...data.bitcoin, timestamp: new Date().toISOString() });
};

// Ethereum
export const ethereum = async (c: Context) => {
  const data = await cached("eth", () =>
    fetch("https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd,gbp,eur,btc,eth&include_24hr_change=true&include_market_cap=true&include_24hr_vol=true").then(r => r.json())
  );
  return c.json({ symbol: "ETH", ...data.ethereum, timestamp: new Date().toISOString() });
};

// Top 100 Coins
export const top100 = async (c: Context) => {
  const data = await cached("top100", () =>
    fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100").then(r => r.json())
  );
  return c.json({ count: data.length, coins: data.map((c: any) => ({
    rank: c.market_cap_rank, symbol: c.symbol.toUpperCase(), name: c.name,
    price: c.current_price, change_24h: c.price_change_percentage_24h,
    market_cap: c.market_cap, volume: c.total_volume, image: c.image
  })), timestamp: new Date().toISOString() });
};

// Trending
export const trending = async (c: Context) => {
  const data = await cached("trending", () =>
    fetch("https://api.coingecko.com/api/v3/search/trending").then(r => r.json())
  );
  return c.json({ coins: data.coins?.map((c: any) => ({
    id: c.item.id, symbol: c.item.symbol, name: c.item.name,
    market_cap_rank: c.item.market_cap_rank, price_btc: c.item.price_btc
  })), timestamp: new Date().toISOString() });
};

// Price by ID
export const price = async (c: Context) => {
  const id = new URL(c.req.url).searchParams.get("id") || "bitcoin";
  const data = await cached("price:" + id, () =>
    fetch("https://api.coingecko.com/api/v3/simple/price?ids=" + id + "&vs_currencies=usd,gbp,eur,btc,eth&include_24hr_change=true").then(r => r.json())
  );
  return c.json({ id, ...data[id], timestamp: new Date().toISOString() });
};

// Exchanges
export const exchanges = async (c: Context) => {
  const data = await cached("exchanges", () =>
    fetch("https://api.coingecko.com/api/v3/exchanges?per_page=50").then(r => r.json())
  );
  return c.json({ count: data.length, exchanges: data.map((e: any) => ({
    id: e.id, name: e.name, country: e.country, trust_score: e.trust_score,
    volume_24h: e.trade_volume_24h_btc, url: e.url, image: e.image
  })), timestamp: new Date().toISOString() });
};

// Global Data
export const global = async (c: Context) => {
  const data = await cached("global", () =>
    fetch("https://api.coingecko.com/api/v3/global").then(r => r.json())
  );
  return c.json({ 
    total_market_cap: data.data.total_market_cap,
    total_volume: data.data.total_volume,
    btc_dominance: data.data.market_cap_percentage.btc,
    eth_dominance: data.data.market_cap_percentage.eth,
    active_cryptos: data.data.active_cryptocurrencies,
    markets: data.data.markets,
    timestamp: new Date().toISOString()
  });
};
