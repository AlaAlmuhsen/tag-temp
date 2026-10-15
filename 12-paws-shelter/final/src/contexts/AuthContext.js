import { createContext, useContext, useReducer } from "react";

const AuthContext = createContext();

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

function reducer(state, action) {
  switch (action.type) {
    case "login":
      return { user: action.payload, isAuthenticated: true, error: "" };
    case "login/failed":
      return { ...state, error: action.payload };
    case "logout":
      return initialState;
    default:
      throw new Error("Unknown action");
  }
}

function AuthProvider({ children }) {
  const [{ user, isAuthenticated, error }, dispatch] = useReducer(
    reducer,
    initialState
  );

  function login(email, password) {
    const found = FAKE_USERS.find(
      (u) => u.email === email && u.password === password
    );

    if (!found)
      return dispatch({
        type: "login/failed",
        payload: "Wrong email or password 🙀",
      });

    // never keep the password in state
    const { password: _, ...user } = found;
    dispatch({ type: "login", payload: user });
  }

  function logout() {
    dispatch({ type: "logout" });
  }

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, error, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined)
    throw new Error("AuthContext was used outside of the AuthProvider");
  return context;
}

export { AuthProvider, useAuth };
