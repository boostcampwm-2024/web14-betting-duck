import { createRootRoute, Outlet } from "@tanstack/react-router";
import { RootHeader } from "@/shared/components/RootHeader";
import { RootSideBar } from "@/shared/components/RootSideBar";

export const Route = createRootRoute({
  component: () => (
    <RootLayout>
      <RootHeader />
      <RootSideBar />
      <Outlet />
    </RootLayout>
  ),
});

function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={`h-h-full layout ml-auto mr-auto grid max-h-[834px] w-full max-w-[520px]`}
    >
      {children}
    </div>
  );
}

export { RootLayout };
