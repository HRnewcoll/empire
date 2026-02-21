// Twitter Theme Page Bot - Auto-posts curated content
import type { Context } from "hono";

const QUEUE: any[] = [];

export const addPost = async (c: Context) => {
  const { niche, content_type, schedule_time } = await c.req.json();
  const post = {
    id: crypto.randomUUID(),
    niche, // crypto, ai, gaming, forex, etc.
    content_type, // quote, news, tip, meme
    schedule_time,
    status: "queued",
    created: new Date().toISOString()
  };
  QUEUE.push(post);
  return c.json({ success: true, post });
};

export const getQueue = (c: Context) => {
  return c.json({ queue: QUEUE, count: QUEUE.length });
};

// Niches that work well
export const niches = (c: Context) => {
  return c.json({
    profitable_niches: [
      { niche: "crypto", hashtags: ["#crypto", "#bitcoin", "#trading"], posts_per_day: 8 },
      { niche: "ai", hashtags: ["#AI", "#ChatGPT", "#MachineLearning"], posts_per_day: 6 },
      { niche: "forex", hashtags: ["#forex", "#trading", "#investing"], posts_per_day: 5 },
      { niche: "gaming", hashtags: ["#gaming", "#twitch", "#esports"], posts_per_day: 10 },
      { niche: "motivation", hashtags: ["#motivation", "#success", "#mindset"], posts_per_day: 6 }
    ],
    monetization: {
      affiliate_links: "Add affiliate links in bio",
      sponsored_posts: "Charge $50-500 per post at 10K followers",
      digital_products: "Sell guides, courses, templates",
      shoutouts: "Charge $20-100 for shoutouts"
    }
  });
};
