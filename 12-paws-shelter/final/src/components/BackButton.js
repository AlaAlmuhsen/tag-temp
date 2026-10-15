import { useNavigate } from "react-router-dom";

function BackButton() {
  const navigate = useNavigate();

  return (
    <button
      type="button"
      className="btn btn-outline"
      onClick={() => navigate(-1)}
    >
      &larr; Back
    </button>
  );
}

export default BackButton;
