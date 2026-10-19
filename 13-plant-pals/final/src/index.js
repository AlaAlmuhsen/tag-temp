import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import "./index.css";
import App from "./App";

// 1. The QueryClient holds the CACHE: every query result lives here
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Data stays "fresh" for 30s: no refetch while fresh.
      // After that it's "stale": shown instantly, then refetched in the background
      // (on mount, on window focus, on reconnect)
      staleTime: 30 * 1000,
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {/* 2. Give the cache to the whole app, like a Context provider */}
    <QueryClientProvider client={queryClient}>
      <App />
      {/* 3. The floating button in the corner: look inside the cache */}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </React.StrictMode>
);
