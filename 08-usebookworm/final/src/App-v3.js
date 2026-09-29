import { useEffect, useRef, useState } from "react";
import StarRating from "./StarRating";

const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

const coverUrl = (coverId) =>
  `https://covers.openlibrary.org/b/id/${coverId}-M.jpg`;

const API_URL = "https://openlibrary.org/search.json";
const DETAILS_FIELDS =
  "title,first_publish_year,cover_i,number_of_pages_median,ratings_average,ratings_count,first_sentence,author_name,publisher,subject";

export default function App() {
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedId, setSelectedId] = useState(null);

  // const [shelf, setShelf] = useState([]);
  const [shelf, setShelf] = useState(function () {
    const storedValue = localStorage.getItem("shelf");
    return JSON.parse(storedValue);
  });

  function handleSelectBook(id) {
    setSelectedId((selectedId) => (id === selectedId ? null : id));
  }

  function handleCloseBook() {
    setSelectedId(null);
  }

  function handleAddToShelf(book) {
    setShelf((shelf) => [...shelf, book]);

    // localStorage.setItem("shelf", JSON.stringify([...shelf, book]));
  }

  function handleDeleteFromShelf(id) {
    setShelf((shelf) => shelf.filter((book) => book.key !== id));
  }

  useEffect(
    function () {
      localStorage.setItem("shelf", JSON.stringify(shelf));
    },
    [shelf]
  );

  useEffect(
    function () {
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

      handleCloseBook();
      fetchBooks();

      return function () {
        controller.abort();
      };
    },
    [query]
  );

  return (
    <>
      <NavBar>
        <Search query={query} setQuery={setQuery} />
        <NumResults books={books} />
      </NavBar>

      <Main>
        <Box>
          {/* {isLoading ? <Loader /> : <BookList books={books} />} */}
          {isLoading && <Loader />}
          {!isLoading && !error && (
            <BookList books={books} onSelectBook={handleSelectBook} />
          )}
          {error && <ErrorMessage message={error} />}
        </Box>

        <Box>
          {selectedId ? (
            <BookDetails
              selectedId={selectedId}
              onCloseBook={handleCloseBook}
              onAddToShelf={handleAddToShelf}
              shelf={shelf}
            />
          ) : (
            <>
              <ShelfSummary shelf={shelf} />
              <ShelfList
                shelf={shelf}
                onDeleteFromShelf={handleDeleteFromShelf}
              />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}

function Loader() {
  return <p className="loader">Flipping pages...</p>;
}

function ErrorMessage({ message }) {
  return (
    <p className="error">
      <span>📕</span> {message}
    </p>
  );
}

function NavBar({ children }) {
  return (
    <nav className="nav-bar">
      <Logo />
      {children}
    </nav>
  );
}

function Logo() {
  return (
    <div className="logo">
      <span role="img">📚</span>
      <h1>useBookworm</h1>
    </div>
  );
}

function Search({ query, setQuery }) {
  const inputEl = useRef(null);

  useEffect(
    function () {
      function callback(e) {
        if (document.activeElement === inputEl.current) return;

        if (e.code === "Enter") {
          inputEl.current.focus();
          setQuery("");
        }
      }

      document.addEventListener("keydown", callback);
      return () => document.removeEventListener("keydown", callback);
    },
    [setQuery]
  );

  // useEffect(function () {
  //   const el = document.querySelector(".search");
  //   console.log(el);
  //   el.focus();
  // }, []);

  return (
    <input
      className="search"
      type="text"
      placeholder="Search books..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      ref={inputEl}
    />
  );
}

function NumResults({ books }) {
  return (
    <p className="num-results">
      <strong>{books.length}</strong> books found
    </p>
  );
}

function Main({ children }) {
  return <main className="main">{children}</main>;
}

function Box({ children }) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="box">
      <button className="btn-toggle" onClick={() => setIsOpen((open) => !open)}>
        {isOpen ? "–" : "+"}
      </button>

      {isOpen && children}
    </div>
  );
}

/*
function ShelfBox() {
  const [shelf, setShelf] = useState(tempShelfData);
  const [isOpen2, setIsOpen2] = useState(true);

  return (
    <div className="box">
      <button
        className="btn-toggle"
        onClick={() => setIsOpen2((open) => !open)}
      >
        {isOpen2 ? "–" : "+"}
      </button>

      {isOpen2 && (
        <>
          <ShelfSummary shelf={shelf} />
          <ShelfList shelf={shelf} />
        </>
      )}
    </div>
  );
}
*/

function BookList({ books, onSelectBook }) {
  return (
    <ul className="list list-books">
      {books?.map((book) => (
        <Book book={book} key={book.key} onSelectBook={onSelectBook} />
      ))}
    </ul>
  );
}

function Book({ book, onSelectBook }) {
  return (
    <li onClick={() => onSelectBook(book.key)}>
      <img src={coverUrl(book.cover_i)} alt={`${book.title} cover`} />
      <h3>{book.title}</h3>
      <div>
        <p>
          <span>🗓</span>
          <span>{book.first_publish_year}</span>
        </p>
      </div>
    </li>
  );
}

function BookDetails({ selectedId, onCloseBook, onAddToShelf, shelf }) {
  const [book, setBook] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [userRating, setUserRating] = useState("");

  const countRef = useRef(0);

  useEffect(
    function () {
      if (userRating) countRef.current++;
    },
    [userRating]
  );

  const isOnShelf = shelf.map((book) => book.key).includes(selectedId);
  const shelfUserRating = shelf.find(
    (book) => book.key === selectedId
  )?.userRating;

  const {
    title,
    first_publish_year: year,
    cover_i: coverId,
    number_of_pages_median: pages,
    ratings_average: communityRating,
    ratings_count: ratingsCount,
    first_sentence: firstSentence,
    author_name: authors,
    publisher: publishers,
    subject: subjects,
  } = book;

  // if (communityRating > 4) return <p>Instant classic!</p>;
  // if (communityRating > 4) [isTop, setIsTop] = useState(true);

  // const [isTop, setIsTop] = useState(communityRating > 4);
  // console.log(isTop);
  // useEffect(
  //   function () {
  //     setIsTop(communityRating > 4);
  //   },
  //   [communityRating]
  // );

  const isTop = communityRating > 4;
  console.log(isTop);

  // const [avgRating, setAvgRating] = useState(0);

  function handleAdd() {
    const newShelfBook = {
      key: selectedId,
      title,
      year,
      cover: coverUrl(coverId),
      communityRating: Number((communityRating ?? 0).toFixed(1)),
      pages: pages ?? 0,
      userRating,
      countRatingDecisions: countRef.current,
    };

    onAddToShelf(newShelfBook);
    onCloseBook();

    // setAvgRating(Number(communityRating));
    // setAvgRating((avgRating) => (avgRating + userRating) / 2);
  }

  useEffect(
    function () {
      function callback(e) {
        if (e.code === "Escape") {
          onCloseBook();
        }
      }

      document.addEventListener("keydown", callback);

      return function () {
        document.removeEventListener("keydown", callback);
      };
    },
    [onCloseBook]
  );

  useEffect(
    function () {
      async function getBookDetails() {
        setIsLoading(true);
        const res = await fetch(
          `${API_URL}?q=key:${selectedId}&fields=${DETAILS_FIELDS}`
        );
        const data = await res.json();
        setBook(data.docs[0]);
        setIsLoading(false);
      }
      getBookDetails();
    },
    [selectedId]
  );

  useEffect(
    function () {
      if (!title) return;
      document.title = `Book | ${title}`;

      return function () {
        document.title = "useBookworm";
        // console.log(`Clean up effect for book ${title}`);
      };
    },
    [title]
  );

  return (
    <div className="details">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <header>
            <button className="btn-back" onClick={onCloseBook}>
              &larr;
            </button>
            <img src={coverUrl(coverId)} alt={`Cover of ${title}`} />
            <div className="details-overview">
              <h2>{title}</h2>
              <p>
                First published {year} &bull; {pages} pages
              </p>
              <p>{subjects?.slice(0, 3).join(", ")}</p>
              <p>
                <span>⭐️</span>
                {communityRating?.toFixed(1)} from {ratingsCount} readers
              </p>
            </div>
          </header>

          {/* <p>{avgRating}</p> */}

          <section>
            <div className="rating">
              {!isOnShelf ? (
                <>
                  <StarRating
                    maxRating={5}
                    size={32}
                    messages={["Meh", "Okay", "Good", "Great", "Loved it"]}
                    onSetRating={setUserRating}
                  />
                  {userRating > 0 && (
                    <button className="btn-add" onClick={handleAdd}>
                      + Add to shelf
                    </button>
                  )}
                </>
              ) : (
                <p>
                  You rated this book {shelfUserRating} <span>⭐️</span>
                </p>
              )}
            </div>
            <p>
              <em>{firstSentence?.[0]}</em>
            </p>
            <p>Written by {authors?.join(", ")}</p>
            <p>Published by {publishers?.[0]}</p>
          </section>
        </>
      )}
    </div>
  );
}

function ShelfSummary({ shelf }) {
  const avgCommunityRating = average(
    shelf.map((book) => book.communityRating)
  );
  const avgUserRating = average(shelf.map((book) => book.userRating));
  const avgPages = average(shelf.map((book) => book.pages));

  return (
    <div className="summary">
      <h2>Books on your shelf</h2>
      <div>
        <p>
          <span>📚</span>
          <span>{shelf.length} books</span>
        </p>
        <p>
          <span>⭐️</span>
          <span>{avgCommunityRating.toFixed(2)}</span>
        </p>
        <p>
          <span>💛</span>
          <span>{avgUserRating.toFixed(2)}</span>
        </p>
        <p>
          <span>📄</span>
          <span>{avgPages} pages</span>
        </p>
      </div>
    </div>
  );
}

function ShelfList({ shelf, onDeleteFromShelf }) {
  return (
    <ul className="list">
      {shelf.map((book) => (
        <ShelfBook
          book={book}
          key={book.key}
          onDeleteFromShelf={onDeleteFromShelf}
        />
      ))}
    </ul>
  );
}

function ShelfBook({ book, onDeleteFromShelf }) {
  return (
    <li>
      <img src={book.cover} alt={`${book.title} cover`} />
      <h3>{book.title}</h3>
      <div>
        <p>
          <span>⭐️</span>
          <span>{book.communityRating}</span>
        </p>
        <p>
          <span>💛</span>
          <span>{book.userRating}</span>
        </p>
        <p>
          <span>📄</span>
          <span>{book.pages} pages</span>
        </p>

        <button
          className="btn-delete"
          onClick={() => onDeleteFromShelf(book.key)}
        >
          X
        </button>
      </div>
    </li>
  );
}
