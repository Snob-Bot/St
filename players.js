import { get } from "./store.js";

export async function handler() {
  const res = await fetch("https://api.policeroleplay.community/v1/server/players", {
    headers: { "Server-Key": process.env.ERLC_API_KEY }
  });

  const data = await res.json();
  const staff = await get("staff", []);

  const players = data.map(p => ({
    username: p.username,
    team: p.team,
    staff: staff.includes(p.username)
  }));

  return {
    statusCode: 200,
    body: JSON.stringify(players)
  };
}
