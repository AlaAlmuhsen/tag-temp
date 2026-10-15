// 🏆 CHALLENGE
import { Link, Navigate, useSearchParams } from "react-router-dom";

function ThankYou() {
  // /thank-you?pet=Luna&adopter=Sara
  const [searchParams] = useSearchParams();
  const pet = searchParams.get("pet");
  const adopter = searchParams.get("adopter");

  // Someone typed /thank-you directly → nothing to thank for
  if (!pet || !adopter) return <Navigate to="/" replace />;

  return (
    <section className="message-page">
      <p className="big-emoji">🎉</p>
      <h1>Thank you, {adopter}!</h1>
      <p>{pet} can't wait to meet you. We'll call you very soon.</p>
      <Link to="/pets" className="btn">
        See other pets
      </Link>
    </section>
  );
}

export default ThankYou;
