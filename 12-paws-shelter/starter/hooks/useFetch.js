import { useEffect, useState } from "react";

// Fetches `url` every time it changes → { data, isLoading, error }
export function useFetch(url) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(
    function () {
      const controller = new AbortController();

      async function fetchData() {
        try {
          setIsLoading(true);
          setError("");

          const res = await fetch(url, { signal: controller.signal });
          if (!res.ok) throw new Error("Not found 😿");

          const json = await res.json();
          setData(json);
        } catch (err) {
          if (err.name === "AbortError") return;

          setError(
            err instanceof TypeError
              ? "Can't reach the server. Did you run `npm run server`? 🐾"
              : err.message
          );
        } finally {
          if (!controller.signal.aborted) setIsLoading(false);
        }
      }

      fetchData();

      return () => controller.abort();
    },
    [url]
  );

  return { data, isLoading, error };
}
