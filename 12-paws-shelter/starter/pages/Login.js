import { useState } from "react";

function Login() {
  // PRE-FILLED FOR DEV PURPOSES
  const [email, setEmail] = useState("sara@paws.dev");
  const [password, setPassword] = useState("1234");

  // TODO: on submit → login(email, password) from useAuth()
  // TODO: logged in → go back to the page the user wanted
  //       (ProtectedRoute saves it in location.state.from), or to /pets
  //       → navigate(redirectTo, { replace: true })
  // DESIGN ONLY: available extras
  //   <p className="form-hint">Please log in to continue 🐾</p>
  //   <p className="form-error">Wrong email or password 🙀</p>

  return (
    <form className="adopt-form" onSubmit={(e) => e.preventDefault()}>
      <h2>🔑 Login</h2>

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

      <button className="btn">Login</button>

      <p className="form-hint">
        Try <strong>sara@paws.dev</strong> or <strong>omar@paws.dev</strong>,
        password <strong>1234</strong>
      </p>
    </form>
  );
}

export default Login;
