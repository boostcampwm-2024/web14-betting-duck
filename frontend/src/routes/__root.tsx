import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import { RootHeader } from "@/shared/components/RootHeader";
import { RootSideBar } from "@/shared/components/RootSideBar";
import { UserProvider } from "@/app/provider/UserProvider";
import type { Auth } from "@/shared/lib/auth";
import { GlobalErrorComponent } from "@/shared/components/Error/GlobalError";
import { cn } from "@/shared/misc";

export const Route = createRootRouteWithContext<{ auth: Auth }>()({
  component: () => (
    <UserProvider>
      <RootLayout>
        <RootHeader />
        <RootSideBar />
        <Outlet />
      </RootLayout>
    </UserProvider>
  ),
  errorComponent: ({ error, reset }) => (
    <GlobalErrorComponent error={error} reset={reset} />
  ),
});

function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      id="root-layout"
      className={cn(
        "layout",
        `h-h-full ml-auto mr-auto grid max-h-[834px] w-full max-w-[520px]`,
      )}
    >
      {children}
    </div>
  );
}

export { RootLayout };
