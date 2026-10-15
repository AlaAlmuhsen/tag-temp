function Navbar() {
  // TODO: every <a href> reloads the WHOLE page (check the Network tab!)
  //       → logo: <Link to="/">
  //       → menu: <NavLink to="...">, it adds the "active" class
  //         to the current page's link (already styled in index.css)
  //       → why does the Home link need the `end` prop?

  // TODO: user & logout come from useAuth()
  //       logout → logout() then navigate("/")

  return (
    <nav className="navbar">
      <a href="/" className="logo">
        🐾 Paws Shelter
      </a>

      <ul className="nav-links">
        <li>
          <a href="/" className="active">
            Home
          </a>
        </li>
        <li>
          <a href="/pets">Pets</a>
        </li>
        <li>
          <a href="/my-adoptions">My adoptions</a>
        </li>
        <li>
          <a href="/about">About</a>
        </li>
      </ul>

      {/* DESIGN ONLY: when logged in, show this instead of the button:
          <div className="nav-user">
            <span className="avatar">👩</span>
            <span>Sara</span>
            <button className="btn btn-outline btn-small">Logout</button>
          </div> */}
      <a href="/login" className="btn btn-small">
        Login
      </a>
    </nav>
  );
}

export default Navbar;
