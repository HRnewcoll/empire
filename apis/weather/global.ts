// WEATHER API - POPULAR CATEGORY
import type { Context } from "hono";

export const currentWeather = async (c: Context) => {
  const city = new URL(c.req.url).searchParams.get("city") || "London";
  return c.json({
    city, temperature: 15, condition: "Partly Cloudy",
    humidity: 65, wind_speed: 10, feels_like: 14,
    forecast: ["Sunny", "Cloudy", "Rain", "Sunny", "Sunny"],
    timestamp: new Date().toISOString()
  });
};

export const weatherForecast = async (c: Context) => {
  const city = new URL(c.req.url).searchParams.get("city") || "London";
  const days = parseInt(new URL(c.req.url).searchParams.get("days") || "7");
  return c.json({
    city, days,
    forecast: Array(days).fill(null).map((_, i) => ({
      date: new Date(Date.now() + i * 86400000).toISOString().split("T")[0],
      high: 18 + Math.floor(Math.random() * 5),
      low: 8 + Math.floor(Math.random() * 5),
      condition: ["Sunny", "Cloudy", "Rain", "Partly Cloudy"][Math.floor(Math.random() * 4)]
    })),
    timestamp: new Date().toISOString()
  });
};
