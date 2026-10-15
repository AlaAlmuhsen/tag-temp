import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
} from "react";

const BASE_URL = "http://localhost:9000";

const DishesContext = createContext();

const initialState = {
  dishes: [],
  isLoading: false,
  currentDish: {},
  error: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return { ...state, isLoading: true };

    case "dishes/loaded":
      return { ...state, isLoading: false, dishes: action.payload };

    case "dish/loaded":
      return { ...state, isLoading: false, currentDish: action.payload };

    case "dish/created":
      return {
        ...state,
        isLoading: false,
        dishes: [...state.dishes, action.payload],
        currentDish: action.payload,
      };

    case "dish/deleted":
      return {
        ...state,
        isLoading: false,
        dishes: state.dishes.filter((dish) => dish.id !== action.payload),
        currentDish: {},
      };

    case "rejected":
      return { ...state, isLoading: false, error: action.payload };

    default:
      throw new Error("Unknown action type");
  }
}

function DishesProvider({ children }) {
  const [{ dishes, isLoading, currentDish, error }, dispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(function () {
    async function fetchDishes() {
      dispatch({ type: "loading" });

      try {
        const res = await fetch(`${BASE_URL}/dishes`);
        const data = await res.json();
        dispatch({ type: "dishes/loaded", payload: data });
      } catch {
        dispatch({
          type: "rejected",
          payload: "There was an error loading your dishes...",
        });
      }
    }
    fetchDishes();
  }, []);

  // Memoized because Dish uses it inside a useEffect dependency array
  const getDish = useCallback(
    async function getDish(id) {
      // the id comes from the URL, so it's a string
      if (Number(id) === currentDish.id) return;

      dispatch({ type: "loading" });

      try {
        const res = await fetch(`${BASE_URL}/dishes/${id}`);
        const data = await res.json();
        dispatch({ type: "dish/loaded", payload: data });
      } catch {
        dispatch({
          type: "rejected",
          payload: "There was an error loading the dish...",
        });
      }
    },
    [currentDish.id]
  );

  async function createDish(newDish) {
    dispatch({ type: "loading" });

    try {
      const res = await fetch(`${BASE_URL}/dishes`, {
        method: "POST",
        body: JSON.stringify(newDish),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      dispatch({ type: "dish/created", payload: data });
    } catch {
      dispatch({
        type: "rejected",
        payload: "There was an error creating the dish...",
      });
    }
  }

  async function deleteDish(id) {
    dispatch({ type: "loading" });

    try {
      await fetch(`${BASE_URL}/dishes/${id}`, {
        method: "DELETE",
      });
      dispatch({ type: "dish/deleted", payload: id });
    } catch {
      dispatch({
        type: "rejected",
        payload: "There was an error deleting the dish...",
      });
    }
  }

  return (
    <DishesContext.Provider
      value={{
        dishes,
        isLoading,
        currentDish,
        error,
        getDish,
        createDish,
        deleteDish,
      }}
    >
      {children}
    </DishesContext.Provider>
  );
}

function useDishes() {
  const context = useContext(DishesContext);
  if (context === undefined)
    throw new Error("DishesContext was used outside the DishesProvider");
  return context;
}

export { DishesProvider, useDishes };
