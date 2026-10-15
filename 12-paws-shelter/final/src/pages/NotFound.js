import { Link } from "react-router-dom";

function NotFound() {
  return (
    <section className="message-page">
      <p className="big-emoji">🙀</p>
      <h1>Page not found</h1>
      <p>Looks like this page ran away. Let's go back home.</p>
      <Link to="/" className="btn">
        Back home
      </Link>
    </section>
  );
}

export default NotFound;
