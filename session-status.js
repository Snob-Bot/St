import { get } from "./store.js";

export async function handler() {
  const session = await get("session", { active: false });

  return {
    statusCode: 200,
    body: JSON.stringify(session)
  };
}
