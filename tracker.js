import { get, set } from "./store.js";

export async function handler() {
  const session = await get("session", {});

  if (!session.active) return { statusCode: 200 };

  const res = await fetch("https://api.policeroleplay.community/v1/server/players", {
    headers: { "Server-Key": process.env.ERLC_API_KEY }
  });

  const players = await res.json();
  const now = Date.now();

  const active = players.map(p => p.username);

  for (const name of active) {
    if (!session.players[name]) {
      session.players[name] = { join: now, total: 0 };
    }
  }

  for (const name in session.players) {
    if (!active.includes(name)) {
      const join = session.players[name].join;
      const duration = now - join;

      const history = await get("history", []);
      history.push({
        username: name,
        duration: Math.floor(duration / 60000),
        time: Date.now()
      });

      await set("history", history);

      delete session.players[name];
    }
  }

  await set("session", session);

  return { statusCode: 200 };
}
