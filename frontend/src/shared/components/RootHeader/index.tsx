import { LogoIcon } from "@shared/icons";

function RootHeader() {
  return (
    <div className="header flex-start flex items-center gap-2 pl-[60px]">
      <LogoIcon />
      <h1>Betting Duck</h1>
    </div>
  );
}

export { RootHeader };
