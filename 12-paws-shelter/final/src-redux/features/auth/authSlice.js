import { createSlice } from "@reduxjs/toolkit";

// ⚠️ FAKE auth: never keep passwords in the frontend in a real app!
// This is only to practice login + protected routes without a backend.
const FAKE_USERS = [
  { id: 1, name: "Sara", email: "sara@paws.dev", password: "1234", avatar: "👩" },
  { id: 2, name: "Omar", email: "omar@paws.dev", password: "1234", avatar: "👨" },
];

const initialState = {
  user: null,
  isAuthenticated: false,
  error: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: {
      // prepare runs BEFORE the reducer: it turns (email, password) into the
      // action payload, so the password never reaches the state
      prepare(email, password) {
        const found = FAKE_USERS.find(
          (u) => u.email === email && u.password === password
        );
        if (!found) return { payload: null };

        const { password: _, ...user } = found;
        return { payload: user };
      },
      reducer(state, action) {
        if (!action.payload) {
          state.error = "Wrong email or password 🙀";
          return;
        }
        // Immer lets us "mutate" the state; it's still immutable under the hood
        state.user = action.payload;
        state.isAuthenticated = true;
        state.error = "";
      },
    },
    logout() {
      return initialState;
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
