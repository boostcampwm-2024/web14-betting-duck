import React from "react";
import {
  LoginIcon,
  UserIcon,
  CreateVoteIcon,
  WaitingRoomIcon,
} from "@/shared/icons";
import { NavItem } from "./NavItem";
import styles from "./RootSidebar.module.css";
import { useLocation } from "@tanstack/react-router";
import { LogoutButton } from "@/features/login-page/ui/components/Logout";

type NavItemType = {
  id: string;
  icon: () => JSX.Element;
  label: string;
  href: string;
  onClick?: () => void;
};

const navItems = {
  top: [
    { icon: UserIcon, id: "my-page-navigation", label: "my", href: "/my-page" },
    {
      icon: CreateVoteIcon,
      id: "create-vote-page-navigation",
      label: "create vote",
      href: "/create-vote",
    },
    {
      icon: WaitingRoomIcon,
      id: "betting-room-navigation",
      label: "betting",
      href: "/betting",
    },
  ],
  login: [
    {
      icon: LoginIcon,
      id: "login-page-navigation",
      label: "login",
      href: "/login",
    },
  ],
};

function changeNavigatorPosition(href: string) {
  let nextPosition = 0;
  if (href.includes("my-page") || href.includes("guest-login")) {
    nextPosition = 0;
  } else if (href.includes("create-vote")) {
    nextPosition = 1;
  } else if (href.includes("betting") || href.includes("vote")) {
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
    <nav className="flex select-none flex-col items-center gap-6">
      {items.map(({ id, icon, label, href }) => (
        <NavItem key={label} id={id} icon={icon()} label={label} href={href} />
      ))}
    </nav>
  );
}

function RootSideBar({ isAuthenticated }: { isAuthenticated: boolean }) {
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
      {isAuthenticated ? <LogoutButton /> : <NavItems items={navItems.login} />}
    </aside>
  );
}

export { RootSideBar };
