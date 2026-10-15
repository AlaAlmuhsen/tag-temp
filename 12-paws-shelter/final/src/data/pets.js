const pets = [
  {
    id: 1,
    name: "Luna",
    type: "cat",
    emoji: "🐱",
    age: 2,
    breed: "Tabby",
    description:
      "Luna is a calm little lady who loves sunny windows and long naps. She will sit on your keyboard while you code.",
    traits: ["Calm", "Loves naps", "Indoor"],
  },
  {
    id: 2,
    name: "Max",
    type: "dog",
    emoji: "🐶",
    age: 4,
    breed: "Golden Retriever",
    description:
      "Max has never met a stranger. He loves fetch, swimming, and stealing socks.",
    traits: ["Friendly", "Energetic", "Good with kids"],
  },
  {
    id: 3,
    name: "Kiwi",
    type: "bird",
    emoji: "🦜",
    age: 6,
    breed: "Parrot",
    description:
      "Kiwi can say 'hello', 'pizza' and, sadly, the sound of a microwave.",
    traits: ["Talkative", "Smart", "Loud"],
  },
  {
    id: 4,
    name: "Coco",
    type: "rabbit",
    emoji: "🐰",
    age: 1,
    breed: "Holland Lop",
    description:
      "Coco has floppy ears and a big appetite for carrots. Does a happy jump called a 'binky'.",
    traits: ["Gentle", "Curious", "Quiet"],
  },
  {
    id: 5,
    name: "Rocky",
    type: "dog",
    emoji: "🐕",
    age: 7,
    breed: "Mixed",
    description:
      "Rocky is a senior gentleman who just wants a soft bed and someone to walk with.",
    traits: ["Relaxed", "Loyal", "Senior"],
  },
  {
    id: 6,
    name: "Shadow",
    type: "cat",
    emoji: "🐈‍⬛",
    age: 3,
    breed: "Black cat",
    description:
      "Shadow is shy at first, then follows you from room to room like... a shadow.",
    traits: ["Shy", "Sweet", "Indoor"],
  },
  {
    id: 7,
    name: "Sunny",
    type: "bird",
    emoji: "🐤",
    age: 2,
    breed: "Canary",
    description: "Sunny sings every morning at 7am. Free alarm clock included!",
    traits: ["Singer", "Cheerful", "Small"],
  },
  {
    id: 8,
    name: "Bella",
    type: "dog",
    emoji: "🐩",
    age: 3,
    breed: "Poodle",
    description:
      "Bella is fancy, smart and knows 12 tricks. Treats are her love language.",
    traits: ["Smart", "Playful", "Hypoallergenic"],
  },
  {
    id: 9,
    name: "Oreo",
    type: "rabbit",
    emoji: "🐇",
    age: 2,
    breed: "Dutch",
    description:
      "Oreo is black and white like the cookie, and just as sweet. Loves running around the house.",
    traits: ["Active", "Social", "Litter trained"],
  },
  {
    id: 10,
    name: "Ginger",
    type: "cat",
    emoji: "🐈",
    age: 5,
    breed: "Orange cat",
    description:
      "Ginger is the boss of the shelter. Will knock things off tables to get your attention.",
    traits: ["Bold", "Funny", "Chatty"],
  },
];

export const PET_TYPES = {
  all: "🐾 All",
  dog: "🐶 Dogs",
  cat: "🐱 Cats",
  bird: "🐦 Birds",
  rabbit: "🐰 Rabbits",
};

// The id from the URL is always a STRING → convert it
export function getPet(id) {
  return pets.find((pet) => pet.id === Number(id));
}

export default pets;
