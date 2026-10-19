export const API_URL = "http://localhost:9000";

export const ROOMS = ["Living room", "Bedroom", "Kitchen", "Bathroom", "Balcony"];

export const EMOJIS = ["🌿", "🌵", "🌱", "🪴", "🌻", "🌷", "🌳", "🍀"];

// Fake slow network, so you can SEE the loading states and the cache working
export function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function daysSince(date) {
  const ms = Date.now() - new Date(date).getTime();
  return Math.floor(ms / (1000 * 60 * 60 * 24));
}

export function needsWater(plant) {
  return daysSince(plant.lastWatered) >= plant.waterEvery;
}

export function formatDays(days) {
  if (days <= 0) return "today";
  if (days === 1) return "yesterday";
  return `${days} days ago`;
}
