import { get } from "./store.js";

export async function handler() {
  const logs = await get("logs", []);

  return {
    statusCode: 200,
    body: JSON.stringify(logs.slice(0, 20))
  };
}
