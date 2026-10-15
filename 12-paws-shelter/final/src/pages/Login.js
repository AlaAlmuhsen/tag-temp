import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

function Login() {
  // PRE-FILLED FOR DEV PURPOSES
  const [email, setEmail] = useState("sara@paws.dev");
  const [password, setPassword] = useState("1234");

  const { login, isAuthenticated, error } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // ProtectedRoute saved the page the user wanted → go back there
  const from = location.state?.from;
  const redirectTo = from ? from.pathname + from.search : "/pets";

  useEffect(
    function () {
      // replace → the login page is removed from the history
      if (isAuthenticated) navigate(redirectTo, { replace: true });
    },
    [isAuthenticated, navigate, redirectTo]
  );

  function handleSubmit(e) {
    e.preventDefault();
    if (email && password) login(email, password);
  }

  return (
    <form className="adopt-form" onSubmit={handleSubmit}>
      <h2>🔑 Login</h2>

      {from && <p className="form-hint">Please log in to continue 🐾</p>}

      <div className="form-row">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="form-row">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      {error && <p className="form-error">{error}</p>}

      <button className="btn">Login</button>

      <p className="form-hint">
        Try <strong>sara@paws.dev</strong> or <strong>omar@paws.dev</strong>,
        password <strong>1234</strong>
      </p>
    </form>
  );
}

export default Login;
