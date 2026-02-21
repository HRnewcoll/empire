// Crypto Faucet - Earn from Ads, Distribute Crypto
import type { Context } from "hono";

const CLAIMS_DB = new Map<string, { lastClaim: number; total: number }>();
const COOLDOWN = 60 * 60 * 1000;
const REWARD = 0.00001;

export const faucetStatus = (c: Context) => {
  const ip = c.req.header("x-forwarded-for") || "unknown";
  const claim = CLAIMS_DB.get(ip);
  return c.json({
    available: !claim || Date.now() - claim.lastClaim > COOLDOWN,
    cooldown_minutes: claim ? Math.max(0, Math.ceil((COOLDOWN - (Date.now() - claim.lastClaim)) / 60000)) : 0
  });
};

export const claim = async (c: Context) => {
  const ip = c.req.header("x-forwarded-for") || "unknown";
  const wallet = new URL(c.req.url).searchParams.get("wallet");
  if (!wallet) return c.json({ error: "Wallet address required" }, 400);
  
  const claim = CLAIMS_DB.get(ip);
  if (claim && Date.now() - claim.lastClaim < COOLDOWN) {
    return c.json({ error: "Cooldown active" }, 429);
  }
  
  CLAIMS_DB.set(ip, { lastClaim: Date.now(), total: (claim?.total || 0) + REWARD });
  return c.json({ success: true, amount: REWARD, next_claim: new Date(Date.now() + COOLDOWN).toISOString() });
};
