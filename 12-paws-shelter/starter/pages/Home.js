function Home() {
  // TODO: replace both <a> with <Link>
  return (
    <section className="home">
      <p className="hero-emoji">🐶🐱🐰</p>
      <h1>Find your new best friend</h1>
      <p>
        Dogs, cats, birds and bunnies are waiting for a home. Meet them, pick
        your favourite, and adopt in one click.
      </p>
      <div className="actions">
        <a href="/pets" className="btn">
          Meet the pets
        </a>
        <a href="/about" className="btn btn-outline">
          How it works
        </a>
      </div>
    </section>
  );
}

export default Home;
