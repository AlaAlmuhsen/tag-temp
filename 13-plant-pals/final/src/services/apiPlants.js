import { API_URL, wait } from "../utils";

// Plain async functions. They know NOTHING about React or React Query.
// They just return data, or THROW if something goes wrong
// (React Query needs the throw to know the request failed).
async function request(path, options) {
  await wait(800);

  let res;
  try {
    res = await fetch(`${API_URL}${path}`, options);
  } catch {
    throw new Error("Can't reach the server. Did you run `npm run server`? 🌱");
  }

  if (!res.ok) throw new Error(`Request failed (${res.status})`);
  return res.json();
}

export function getPlants() {
  return request("/plants");
}

export function getPlant(id) {
  return request(`/plants/${id}`);
}

export function createPlant(newPlant) {
  return request("/plants", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...newPlant, lastWatered: new Date().toISOString() }),
  });
}

export function waterPlant(id) {
  return request(`/plants/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ lastWatered: new Date().toISOString() }),
  });
}

export function deletePlant(id) {
  return request(`/plants/${id}`, { method: "DELETE" });
}
