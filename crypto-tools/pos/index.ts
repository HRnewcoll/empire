// Crypto POS - Point of Sale
import type { Context } from "hono";

const INVOICES = new Map<string, any>();

export const createInvoice = async (c: Context) => {
  const { amount, currency = "BTC", merchant, item } = await c.req.json();
  const id = crypto.randomUUID();
  const address = "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh";
  const invoice = { id, amount, currency, merchant, item, address, status: "pending", created: new Date().toISOString(), expires: new Date(Date.now() + 900000).toISOString() };
  INVOICES.set(id, invoice);
  return c.json({ ...invoice, qr: "https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=bitcoin:" + address + "?amount=" + amount });
};

export const checkPayment = (c: Context) => {
  const id = new URL(c.req.url).searchParams.get("id");
  const invoice = INVOICES.get(id);
  if (!invoice) return c.json({ error: "Not found" }, 404);
  return c.json(invoice);
};
