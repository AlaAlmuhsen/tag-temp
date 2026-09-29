import { useState } from "react";

const tempBookData = [
  {
    key: "/works/OL27482W",
    title: "The Hobbit",
    first_publish_year: 1937,
    cover_i: 14627509,
  },
  {
    key: "/works/OL1168083W",
    title: "Nineteen Eighty-Four",
    first_publish_year: 1949,
    cover_i: 9267242,
  },
  {
    key: "/works/OL21745884W",
    title: "Project Hail Mary",
    first_publish_year: 2021,
    cover_i: 11200092,
  },
];

const tempShelfData = [
  {
    key: "/works/OL893414W",
    title: "Dune",
    year: 1965,
    cover: "https://covers.openlibrary.org/b/id/11481354-M.jpg",
    pages: 608,
    communityRating: 4.3,
    userRating: 5,
  },
  {
    key: "/works/OL10263W",
    title: "The Little Prince",
    year: 1943,
    cover: "https://covers.openlibrary.org/b/id/10708272-M.jpg",
    pages: 96,
    communityRating: 4.4,
    userRating: 4,
  },
];

const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

const coverUrl = (coverId) =>
  `https://covers.openlibrary.org/b/id/${coverId}-M.jpg`;

export default function App() {
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState(tempBookData);
  const [shelf, setShelf] = useState(tempShelfData);
  const [isOpen1, setIsOpen1] = useState(true);
  const [isOpen2, setIsOpen2] = useState(true);

  const avgCommunityRating = average(
    shelf.map((book) => book.communityRating)
  );
  const avgUserRating = average(shelf.map((book) => book.userRating));
  const avgPages = average(shelf.map((book) => book.pages));

  return (
    <>
      <nav className="nav-bar">
        <div className="logo">
          <span role="img">📚</span>
          <h1>useBookworm</h1>
        </div>
        <input
          className="search"
          type="text"
          placeholder="Search books..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <p className="num-results">
          <strong>{books.length}</strong> books found
        </p>
      </nav>

      <main className="main">
        <div className="box">
          <button
            className="btn-toggle"
            onClick={() => setIsOpen1((open) => !open)}
          >
            {isOpen1 ? "–" : "+"}
          </button>
          {isOpen1 && (
            <ul className="list">
              {books?.map((book) => (
                <li key={book.key}>
                  <img
                    src={coverUrl(book.cover_i)}
                    alt={`${book.title} cover`}
                  />
                  <h3>{book.title}</h3>
                  <div>
                    <p>
                      <span>🗓</span>
                      <span>{book.first_publish_year}</span>
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="box">
          <button
            className="btn-toggle"
            onClick={() => setIsOpen2((open) => !open)}
          >
            {isOpen2 ? "–" : "+"}
          </button>
          {isOpen2 && (
            <>
              <div className="summary">
                <h2>Books on your shelf</h2>
                <div>
                  <p>
                    <span>📚</span>
                    <span>{shelf.length} books</span>
                  </p>
                  <p>
                    <span>⭐️</span>
                    <span>{avgCommunityRating}</span>
                  </p>
                  <p>
                    <span>💛</span>
                    <span>{avgUserRating}</span>
                  </p>
                  <p>
                    <span>📄</span>
                    <span>{avgPages} pages</span>
                  </p>
                </div>
              </div>

              <ul className="list">
                {shelf.map((book) => (
                  <li key={book.key}>
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
                    </div>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      </main>
    </>
  );
}
