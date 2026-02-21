// Memecoin Generator - Creates tokens on pump.fun style platforms
import type { Context } from "hono";

export const generate = async (c: Context) => {
  const { name, symbol, description, image_url, twitter, telegram, website } = await c.req.json();
  
  const token = {
    name,
    symbol: symbol.toUpperCase(),
    description,
    image_url,
    socials: { twitter, telegram, website },
    contract_address: "0x" + Array.from({ length: 40 }, () => "0123456789abcdef"[Math.floor(Math.random() * 16)]).join(""),
    created: new Date().toISOString(),
    platform: "pump.fun",
    instructions: [
      "1. Go to pump.fun",
      "2. Connect your wallet",
      "3. Create new token with these details",
      "4. Add liquidity",
      "5. Promote on social media"
    ],
    tips: [
      "Use trending memes for name/symbol",
      "Post timing matters - US hours work best",
      "Engage with communities on Twitter/Telegram",
      "Consider influencer partnerships"
    ]
  };
  
  return c.json(token);
};

export const trending = async (c: Context) => {
  // In production, scrape pump.fun or dexscreener
  return c.json({
    trending: [
      { symbol: "PEPE", name: "Pepe", market_cap: "$1.2B", change_24h: "+15%" },
      { symbol: "WIF", name: "dogwifhat", market_cap: "$800M", change_24h: "+22%" },
      { symbol: "BONK", name: "Bonk", market_cap: "$600M", change_24h: "+8%" }
    ],
    timestamp: new Date().toISOString()
  });
};
