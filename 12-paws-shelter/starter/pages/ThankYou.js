// 🏆 CHALLENGE: see CHALLENGE.md
function ThankYou() {
  // TODO: read both values from the query string (useSearchParams)
  //       missing? → <Navigate to="/" replace />
  const pet = "Luna";
  const adopter = "Sara";

  return (
    <section className="message-page">
      <p className="big-emoji">🎉</p>
      <h1>Thank you, {adopter}!</h1>
      <p>{pet} can't wait to meet you. We'll call you very soon.</p>
      <a href="/pets" className="btn">
        See other pets
      </a>
    </section>
  );
}

export default ThankYou;
