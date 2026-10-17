import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice";
import petsReducer from "./features/pets/petsSlice";

// One store for the whole app. Each slice owns one part of the state:
// state.auth → { user, isAuthenticated, error }
// state.pets → { pets, isLoading, error, currentPet, isPetLoading }
const store = configureStore({
  reducer: {
    auth: authReducer,
    pets: petsReducer,
  },
});

export default store;
