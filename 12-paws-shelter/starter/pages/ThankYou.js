function ThankYou() {
  // TODO: read the pet name from the query string (useSearchParams)
  //       missing? → <Navigate to="/" replace />
  // TODO: user from useAuth()
  const pet = "Luna";
  const user = { name: "Sara" };

  return (
    <section className="message-page">
      <p className="big-emoji">🎉</p>
      <h1>Thank you, {user.name}!</h1>
      <p>{pet} can't wait to meet you. We'll call you very soon.</p>
      <div className="actions">
        <a href="/my-adoptions" className="btn">
          My adoptions
        </a>
        <a href="/pets" className="btn btn-outline">
          See other pets
        </a>
      </div>
    </section>
  );
}

export default ThankYou;
