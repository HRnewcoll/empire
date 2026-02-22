// GAMING APIS - GROWING DEMAND
import type { Context } from "hono";

export const gameInfo = async (c: Context) => {
  const game = new URL(c.req.url).searchParams.get("game") || "Minecraft";
  return c.json({
    name: game,
    genre: "Sandbox",
    platform: ["PC", "Console", "Mobile"],
    rating: 4.5,
    players: "140M+",
    release_date: "2011-11-18",
    developer: "Mojang",
    timestamp: new Date().toISOString()
  });
};

export const steamDeals = async (c: Context) => {
  return c.json({
    deals: [
      { name: "Cyberpunk 2077", discount: 50, price: "$29.99", original: "$59.99" },
      { name: "Elden Ring", discount: 30, price: "$41.99", original: "$59.99" },
      { name: "Hogwarts Legacy", discount: 40, price: "$35.99", original: "$59.99" }
    ],
    timestamp: new Date().toISOString()
  });
};
