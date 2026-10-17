export const API_URL = "http://localhost:9000";

export const PET_TYPES = {
  all: "🐾 All",
  dog: "🐶 Dogs",
  cat: "🐱 Cats",
  bird: "🐦 Birds",
  rabbit: "🐰 Rabbits",
};

export const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));
