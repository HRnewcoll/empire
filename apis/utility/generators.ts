// UTILITY GENERATORS - ALWAYS POPULAR
import type { Context } from "hono";

export const generateName = async (c: Context) => {
  const first = ["Alex", "Jordan", "Taylor", "Morgan", "Casey"];
  const last = ["Smith", "Johnson", "Williams", "Brown", "Jones"];
  return c.json({
    name: `${first[Math.floor(Math.random() * first.length)]} ${last[Math.floor(Math.random() * last.length)]}`,
    timestamp: new Date().toISOString()
  });
};

export const generateEmail = async (c: Context) => {
  const domains = ["gmail.com", "yahoo.com", "outlook.com", "proton.me"];
  const username = Math.random().toString(36).substring(7);
  return c.json({
    email: `${username}@${domains[Math.floor(Math.random() * domains.length)]}`,
    timestamp: new Date().toISOString()
  });
};

export const generatePhone = async (c: Context) => {
  const country = new URL(c.req.url).searchParams.get("country") || "UK";
  return c.json({
    phone: `+44 7${Math.floor(Math.random() * 900000000 + 100000000)}`,
    country, timestamp: new Date().toISOString()
  });
};

export const loremIpsum = async (c: Context) => {
  const paragraphs = parseInt(new URL(c.req.url).searchParams.get("paragraphs") || "3");
  const text = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. ".repeat(20);
  return c.json({ text: text.repeat(paragraphs), timestamp: new Date().toISOString() });
};
