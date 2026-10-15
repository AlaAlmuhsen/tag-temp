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
      <div className="actions">
        <a href="/adoptions" className="btn">
          See adoptions
        </a>
        <a href="/pets" className="btn btn-outline">
          See other pets
        </a>
      </div>
    </section>
  );
}

export default ThankYou;
