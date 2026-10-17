import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API_URL } from "../../utils";

const initialState = {
  pets: [],
  isLoading: true,
  error: "",

  // The pet opened in PetDetails / AdoptForm, fetched fresh from the API
  currentPet: null,
  currentPetId: null, // the id from the URL (a string) we last asked for
  isPetLoading: true,
  currentRequestId: null,
};

// Async thunks: each one dispatches pending → fulfilled / rejected for us
export const fetchPets = createAsyncThunk(
  "pets/fetchPets",
  async (_, { rejectWithValue }) => {
    try {
      const res = await fetch(`${API_URL}/pets`);
      return await res.json();
    } catch {
      return rejectWithValue(
        "Can't reach the server. Did you run `npm run server`? 🐾"
      );
    }
  }
);

export const fetchPet = createAsyncThunk("pets/fetchPet", async (id) => {
  const res = await fetch(`${API_URL}/pets/${id}`);
  if (!res.ok) return null;
  return res.json();
});

// Rejects if it fails, so the form can show an error (use .unwrap())
export const adoptPet = createAsyncThunk(
  "pets/adoptPet",
  async ({ id, user, reason }) => {
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
    return res.json();
  }
);

const petsSlice = createSlice({
  name: "pets",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPets.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchPets.fulfilled, (state, action) => {
        state.pets = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchPets.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      })

      // Remember which request is the latest, so a slow response for an
      // old petId can't overwrite the pet we're looking at now
      .addCase(fetchPet.pending, (state, action) => {
        state.isPetLoading = true;
        state.currentPetId = action.meta.arg;
        state.currentRequestId = action.meta.requestId;
      })
      .addCase(fetchPet.fulfilled, (state, action) => {
        if (state.currentRequestId !== action.meta.requestId) return;
        state.currentPet = action.payload;
        state.isPetLoading = false;
      })
      .addCase(fetchPet.rejected, (state, action) => {
        if (state.currentRequestId !== action.meta.requestId) return;
        state.currentPet = null;
        state.isPetLoading = false;
      })

      .addCase(adoptPet.fulfilled, (state, action) => {
        const updatedPet = action.payload;
        // currentPet is NOT updated here: AdoptForm would see `adopted: true`
        // and redirect before it navigates to /thank-you.
        // PetDetails fetches the pet again anyway when it opens.
        state.pets = state.pets.map((pet) =>
          pet.id === updatedPet.id ? updatedPet : pet
        );
      });
  },
});

export default petsSlice.reducer;
