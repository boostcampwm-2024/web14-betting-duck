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
import { LogoutButton } from "@/features/login-page/ui/components/Logout";
import { useUserContext } from "@/shared/hooks/useUserContext";

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
  login: [{ icon: LoginIcon, label: "login", href: "/login" }],
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
      {items.map(({ icon, label, href }) => (
        <NavItem key={label} icon={icon()} label={label} href={href} />
      ))}
    </nav>
  );
}

function RootSideBar() {
  const location = useLocation();
  const { userInfo } = useUserContext();
  const [isAuthenticated, setIsAuthenticated] = React.useState(
    userInfo.isAuthenticated,
  );

  React.useEffect(() => {
    (async () => {
      const userTokenResponse = await fetch("/api/users/token");
      if (userTokenResponse.ok) {
        setIsAuthenticated(true);
      }
    })();
  }, []);

  React.useEffect(() => {
    setIsAuthenticated(userInfo.isAuthenticated);
  }, [userInfo]);

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
