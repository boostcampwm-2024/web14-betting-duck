import {
  LoginIcon,
  UserIcon,
  ChatIcon,
  CreateVoteIcon,
} from "../../shared/assets/icons";
import { NavItem } from "./item";

type NavItemType = {
  icon: () => JSX.Element;
  label: string;
  onClick?: () => void;
};

const navItems = {
  top: [
    { icon: UserIcon, label: "my", href: "/my" },
    { icon: ChatIcon, label: "chat", href: "/chat" },
    { icon: CreateVoteIcon, label: "create vote", href: "/create-vote" },
  ],
  bottom: [{ icon: LoginIcon, label: "Login", href: "/login" }],
};

const NavItems = ({ items }: { items: NavItemType[] }) => (
  <nav className="flex flex-col items-center gap-6">
    {" "}
    {items.map(({ icon, label }) => (
      <NavItem key={label} icon={icon()} label={label} />
    ))}
  </nav>
);

function RootSideBar() {
  return (
    <aside className="sidebar flex h-full flex-col justify-between pb-4">
      <NavItems items={navItems.top} />
      <NavItems items={navItems.bottom} />
    </aside>
  );
}

export { RootSideBar };
