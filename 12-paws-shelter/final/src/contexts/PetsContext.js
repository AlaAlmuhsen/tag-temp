import { createContext, useContext, useEffect, useReducer } from "react";
import { API_URL } from "../utils";

const PetsContext = createContext();

const initialState = {
  pets: [],
  isLoading: true,
  error: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "pets/loaded":
      return { ...state, pets: action.payload, isLoading: false };
    case "rejected":
      return { ...state, error: action.payload, isLoading: false };
    case "pet/adopted":
      return {
        ...state,
        pets: state.pets.map((pet) =>
          pet.id === action.payload.id ? action.payload : pet,
        ),
      };
    default:
      throw new Error("Unknown action");
  }
}

function PetsProvider({ children }) {
  const [{ pets, isLoading, error }, dispatch] = useReducer(
    reducer,
    initialState,
  );

  // Fetch ALL pets once. Every page reads them from here
  useEffect(function () {
    async function fetchPets() {
      try {
        const res = await fetch(`${API_URL}/pets`);
        const data = await res.json();
        dispatch({ type: "pets/loaded", payload: data });
      } catch {
        dispatch({
          type: "rejected",
          payload: "Can't reach the server. Did you run `npm run server`? 🐾",
        });
      }
    }
    fetchPets();
  }, []);

  async function getPet(id) {
    const res = await fetch(`${API_URL}/pets/${id}`);
    if (!res.ok) return null;
    return res.json();
  }

  // Throws if it fails, so the form can show an error
  async function adoptPet(id, user, reason) {
    const res = await fetch(`${API_URL}/pets/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        adopted: true,
        adopterId: user.id,
        adopter: user.name,
        reason,
        adoptedAt: new Date().toISOString(),
      }),
    });
    if (!res.ok) throw new Error("Couldn't adopt");

    const updatedPet = await res.json();
    dispatch({ type: "pet/adopted", payload: updatedPet });
  }

  return (
    <PetsContext.Provider value={{ pets, isLoading, error, getPet, adoptPet }}>
      {children}
    </PetsContext.Provider>
  );
}

function usePets() {
  const context = useContext(PetsContext);
  if (context === undefined)
    throw new Error("PetsContext was used outside of the PetsProvider");
  return context;
}

export { PetsProvider, usePets };
