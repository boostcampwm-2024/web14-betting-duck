import { createRootRoute, Outlet } from "@tanstack/react-router";
import { RootLayout } from "@pages/RootLayout";
import { RootHeader } from "@widgets/root/RootHeader";
import { RootSideBar } from "@widgets/root/RootSideBar";

export const Route = createRootRoute({
  component: () => (
    <RootLayout>
      <RootHeader />
      <RootSideBar />
      <Outlet />
    </RootLayout>
  ),
});
