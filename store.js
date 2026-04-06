import { getStore } from "@netlify/blobs";

const store = getStore("main");

export async function get(key, def = {}) {
  const data = await store.get(key, { type: "json" });
  return data || def;
}

export async function set(key, value) {
  await store.setJSON(key, value);
}
