import { useIsFetching } from "@tanstack/react-query";

function Header() {
  // How many queries are fetching right now, anywhere in the app
  const isFetching = useIsFetching();

  return (
    <header className="header">
      <h1>🪴 Plant Pals</h1>
      <p className="header__subtitle">Keep your green friends alive</p>
      {isFetching > 0 && <span className="syncing">🔄 Syncing...</span>}
    </header>
  );
}

export default Header;
