import { Link } from "react-router-dom";

function Home() {
  return (
    <section className="home">
      <p className="hero-emoji">🐶🐱🐰</p>
      <h1>Find your new best friend</h1>
      <p>
        Dogs, cats, birds and bunnies are waiting for a home. Meet them, pick
        your favourite, and adopt in one click.
      </p>
      <div className="actions">
        <Link to="/pets" className="btn">
          Meet the pets
        </Link>
        <Link to="/about" className="btn btn-outline">
          How it works
        </Link>
      </div>
    </section>
  );
}

export default Home;
