function Navbar() {
  // TODO: every <a href> reloads the WHOLE page (check the Network tab!)
  //       → logo: <Link to="/">
  //       → menu: <NavLink to="...">, it adds the "active" class
  //         to the current page's link (already styled in index.css)
  //       → why does the Home link need the `end` prop?

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
          <a href="/about">About</a>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
