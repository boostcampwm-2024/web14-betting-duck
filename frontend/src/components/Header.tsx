import duckIcon from "/src/assets/icons/header_logo_duck.svg";

function Header() {
  return (
    <header
      role="banner"
      aria-label="Main Header"
      className="bg-layout-sidebar text-default flex gap-2 p-4 text-lg font-extrabold"
    >
      <img src={duckIcon} alt="headerIcon" className="ml-20" />
      Betting Duck
    </header>
  );
}

export default Header;
