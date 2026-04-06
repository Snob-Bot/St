import { get, set } from "./store.js";

export async function handler() {
  const session = await get("session", {});
  session.active = false;

  await set("session", session);

  const logs = await get("logs", []);
  logs.unshift({ message: "Session ended", time: Date.now() });
  await set("logs", logs);

  return { statusCode: 200 };
}
