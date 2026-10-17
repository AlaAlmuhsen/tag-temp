import { useSelector } from "react-redux";
import { Link, Navigate, useSearchParams } from "react-router-dom";

function ThankYou() {
  // /thank-you?pet=Luna
  const [searchParams] = useSearchParams();
  const pet = searchParams.get("pet");
  const user = useSelector((state) => state.auth.user);

  // Someone typed /thank-you directly → nothing to thank for
  if (!pet) return <Navigate to="/" replace />;

  return (
    <section className="message-page">
      <p className="big-emoji">🎉</p>
      <h1>Thank you, {user.name}!</h1>
      <p>{pet} can't wait to meet you. We'll call you very soon.</p>
      <div className="actions">
        <Link to="/my-adoptions" className="btn">
          My adoptions
        </Link>
        <Link to="/pets" className="btn btn-outline">
          See other pets
        </Link>
      </div>
    </section>
  );
}

export default ThankYou;
