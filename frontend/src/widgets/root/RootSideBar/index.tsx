import React from "react";
import { LoginIcon, UserIcon, ChatIcon, CreateVoteIcon } from "@/assets/icons";
import { NavItem } from "./item";
import styles from "./style.module.css";
import { useLocation } from "@tanstack/react-router";
import { WaitingRoom } from "@/assets/icons/WatingRoom";

type NavItemType = {
  icon: () => JSX.Element;
  label: string;
  href: string;
  onClick?: () => void;
};

const navItems = {
  top: [
    { icon: UserIcon, label: "my", href: "/my-page" },
    { icon: ChatIcon, label: "chat", href: "/chat" },
    { icon: CreateVoteIcon, label: "create vote", href: "/create-vote" },
    { icon: WaitingRoom, label: "waiting room", href: "/waiting-room" },
  ],
  bottom: [{ icon: LoginIcon, label: "Login", href: "/login" }],
};

function changeNavigatorPosition(href: string) {
  if (!navItems.top.some((item) => item.href == href)) return;
  const index = navItems.top.findIndex((item) => item.href === href);
  document.documentElement.style.setProperty(
    "--navigator-position",
    index === 3 ? "3.2" : index.toString(),
  );
}

function TopSideBar({ items }: { items: NavItemType[] }) {
  const location = useLocation();

  React.useEffect(() => {
    changeNavigatorPosition(location.pathname);
  }, [location]);

  return (
    <nav className="flex flex-col items-center gap-6">
      {items.map(({ icon, label, href }) => (
        <NavItem key={label} icon={icon()} label={label} href={href} />
      ))}
    </nav>
  );
}

function BottomSideBar({ items }: { items: NavItemType[] }) {
  return (
    <nav className="flex flex-col items-center gap-6">
      {items.map(({ icon, label, href }) => (
        <NavItem key={label} icon={icon()} label={label} href={href} />
      ))}
    </nav>
  );
}

function RootSideBar() {
  return (
    <aside
      id="navigation-sidebar"
      className="sidebar relative flex h-full flex-col justify-between pb-4"
    >
      <div className={styles.navigator} />
      <TopSideBar items={navItems.top} />
      <BottomSideBar items={navItems.bottom} />
    </aside>
  );
}

export { RootSideBar };
