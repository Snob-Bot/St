import { get, set } from "./store.js";

export async function handler() {
  const session = {
    active: true,
    startTime: Date.now(),
    players: {}
  };

  await set("session", session);

  const logs = await get("logs", []);
  logs.unshift({ message: "Session started", time: Date.now() });
  await set("logs", logs);

  return { statusCode: 200 };
}
