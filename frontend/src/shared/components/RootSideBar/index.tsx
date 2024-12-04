import React from "react";
import {
  LoginIcon,
  UserIcon,
  CreateVoteIcon,
  WaitingRoomIcon,
} from "@/shared/icons";
import { NavItem } from "./item";
import styles from "./style.module.css";
import { useLocation, useRouteContext } from "@tanstack/react-router";
import { useQueryClient } from "@tanstack/react-query";
import { AuthStatusTypeSchema } from "@/shared/lib/auth/guard";
import { LogoutButton } from "@/features/login-page/ui/components/Logout";

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
  const context = useRouteContext({
    from: "__root__",
  });
  const data = useQueryClient(context.queryClient).getQueryData(["auth"]);
  let isAuthenticated = false;
  const parsedResult = AuthStatusTypeSchema.safeParse(data);
  if (parsedResult.success) {
    isAuthenticated = parsedResult.data.isAuthenticated;
  }

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
