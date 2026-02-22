// DATA CONVERSION APIS
import type { Context } from "hono";

export const jsonToCsv = async (c: Context) => {
  const json = await c.req.json();
  const keys = Object.keys(json[0] || {});
  const csv = keys.join(",") + "\n" + json.map((row: any) => keys.map(k => row[k]).join(",")).join("\n");
  return c.text(csv);
};

export const csvToJson = async (c: Context) => {
  const csv = await c.req.text();
  const lines = csv.split("\n");
  const headers = lines[0].split(",");
  const data = lines.slice(1).map(line => {
    const values = line.split(",");
    const obj: any = {};
    headers.forEach((h, i) => obj[h] = values[i]);
    return obj;
  });
  return c.json(data);
};

export const base64Encode = async (c: Context) => {
  const text = await c.req.text();
  return c.json({ encoded: btoa(text), timestamp: new Date().toISOString() });
};

export const base64Decode = async (c: Context) => {
  const encoded = await c.req.text();
  return c.json({ decoded: atob(encoded), timestamp: new Date().toISOString() });
};
