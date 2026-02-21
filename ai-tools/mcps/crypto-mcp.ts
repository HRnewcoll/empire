// Crypto MCP Server - Gives AI real-time crypto data
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

const server = new Server({ name: "crypto-mcp", version: "1.0.0" }, { capabilities: { tools: {} } });

server.setRequestHandler("tools/list", async () => ({
  tools: [
    { name: "get_crypto_price", description: "Get current price of a cryptocurrency", inputSchema: { type: "object", properties: { symbol: { type: "string", description: "Crypto symbol (e.g., BTC, ETH)" } }, required: ["symbol"] } },
    { name: "get_top_cryptos", description: "Get top 100 cryptocurrencies by market cap", inputSchema: { type: "object", properties: {} } },
    { name: "get_trending", description: "Get trending cryptocurrencies", inputSchema: { type: "object", properties: {} } }
  ]
}));

server.setRequestHandler("tools/call", async (request: any) => {
  const { name, arguments: args } = request.params;
  
  if (name === "get_crypto_price") {
    const data = await fetch("https://api.coingecko.com/api/v3/simple/price?ids=" + args.symbol.toLowerCase() + "&vs_currencies=usd,gbp&include_24hr_change=true").then(r => r.json());
    return { content: [{ type: "text", text: JSON.stringify(data) }] };
  }
  
  if (name === "get_top_cryptos") {
    const data = await fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100").then(r => r.json());
    return { content: [{ type: "text", text: JSON.stringify(data.slice(0, 20).map((c: any) => ({ rank: c.market_cap_rank, symbol: c.symbol, name: c.name, price: c.current_price, change: c.price_change_percentage_24h }))) }] };
  }
  
  if (name === "get_trending") {
    const data = await fetch("https://api.coingecko.com/api/v3/search/trending").then(r => r.json());
    return { content: [{ type: "text", text: JSON.stringify(data.coins?.map((c: any) => ({ name: c.item.name, symbol: c.item.symbol })) }] };
  }
  
  throw new Error("Unknown tool");
});

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
}
main();
