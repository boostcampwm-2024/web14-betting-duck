import React from "react";
import {
  LoginIcon,
  UserIcon,
  ChatIcon,
  CreateVoteIcon,
  WaitingRoomIcon,
} from "@shared/icons";
import { NavItem } from "./item";
import styles from "./style.module.css";
import { useLocation } from "@tanstack/react-router";

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
    { icon: WaitingRoomIcon, label: "waiting room", href: "/waiting-room" },
  ],
  bottom: [{ icon: LoginIcon, label: "login", href: "/login" }],
};

function changeNavigatorPosition(href: string) {
  let nextPosition = 0;
  if (!navItems.top.some((item) => item.href == href)) {
    nextPosition = 9.9;
  } else {
    const index = navItems.top.findIndex((item) => item.href === href);
    nextPosition = index === 3 ? 3.2 : index;
  }
  document.documentElement.style.setProperty(
    "--navigator-position",
    nextPosition.toString(),
  );
}

function NavItems({ items }: { items: NavItemType[] }) {
  return (
    <nav className="flex flex-col items-center gap-6">
      {items.map(({ icon, label, href }) => (
        <NavItem key={label} icon={icon()} label={label} href={href} />
      ))}
    </nav>
  );
}

function RootSideBar() {
  const location = useLocation();

  React.useEffect(() => {
    changeNavigatorPosition(location.pathname);
  }, [location]);

  return (
    <aside
      id="navigation-sidebar"
      className="sidebar relative flex h-full flex-col justify-between pb-4"
    >
      <div className={styles.navigator} />
      <NavItems items={navItems.top} />
      <NavItems items={navItems.bottom} />
    </aside>
  );
}

export { RootSideBar };
