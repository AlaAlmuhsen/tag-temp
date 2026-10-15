import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/");
  }

  return (
    <nav className="navbar">
      <Link to="/" className="logo">
        🐾 Paws Shelter
      </Link>

      <ul className="nav-links">
        <li>
          {/* `end` → only active on exactly "/" */}
          <NavLink to="/" end>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/pets">Pets</NavLink>
        </li>
        <li>
          <NavLink to="/my-adoptions">My adoptions</NavLink>
        </li>
        <li>
          <NavLink to="/about">About</NavLink>
        </li>
      </ul>

      {isAuthenticated ? (
        <div className="nav-user">
          <span className="avatar">{user.avatar}</span>
          <span>{user.name}</span>
          <button className="btn btn-outline btn-small" onClick={handleLogout}>
            Logout
          </button>
        </div>
      ) : (
        <Link to="/login" className="btn btn-small">
          Login
        </Link>
      )}
    </nav>
  );
}

export default Navbar;
