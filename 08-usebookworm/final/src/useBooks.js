import { useState, useEffect } from "react";

const API_URL = "https://openlibrary.org/search.json";

export function useBooks(query) {
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(
    function () {
      // callback?.();

      const controller = new AbortController();

      async function fetchBooks() {
        try {
          setIsLoading(true);
          setError("");

          const res = await fetch(
            `${API_URL}?q=${query}&limit=20&fields=key,title,first_publish_year,cover_i`,
            { signal: controller.signal }
          );

          if (!res.ok)
            throw new Error("Something went wrong with fetching books");

          const data = await res.json();
          if (data.numFound === 0) throw new Error("Book not found");

          setBooks(data.docs);
          setError("");
        } catch (err) {
          if (err.name !== "AbortError") {
            console.log(err.message);
            setError(err.message);
          }
        } finally {
          setIsLoading(false);
        }
      }

      if (query.length < 3) {
        setBooks([]);
        setError("");
        return;
      }

      fetchBooks();

      return function () {
        controller.abort();
      };
    },
    [query]
  );

  return { books, isLoading, error };
}
