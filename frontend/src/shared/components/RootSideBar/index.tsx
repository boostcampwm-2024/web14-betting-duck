import React from "react";
import {
  LoginIcon,
  UserIcon,
  CreateVoteIcon,
  WaitingRoomIcon,
} from "@/shared/icons";
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
    { icon: CreateVoteIcon, label: "create vote", href: "/create-vote" },
    { icon: WaitingRoomIcon, label: "betting", href: "/betting" },
  ],
  bottom: [{ icon: LoginIcon, label: "login", href: "/login" }],
};

function changeNavigatorPosition(href: string) {
  let nextPosition = 0;
  if (href.includes("my-page")) {
    nextPosition = 0;
  } else if (href.includes("create-vote")) {
    nextPosition = 1;
  } else if (href.includes("betting") || href.includes("roomId")) {
    nextPosition = 2.2;
  } else if (href.includes("login")) {
    nextPosition = 9.9;
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
    changeNavigatorPosition(location.href);
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
