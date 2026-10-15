function NotFound() {
  // TODO: show this for ANY unknown URL → <Route path="*" ... />
  return (
    <section className="message-page">
      <p className="big-emoji">🙀</p>
      <h1>Page not found</h1>
      <p>Looks like this page ran away. Let's go back home.</p>
      <a href="/" className="btn">
        Back home
      </a>
    </section>
  );
}

export default NotFound;
