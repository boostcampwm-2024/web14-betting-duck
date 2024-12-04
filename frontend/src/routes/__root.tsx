import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import { RootHeader } from "@/shared/components/RootHeader";
import { RootSideBar } from "@/shared/components/RootSideBar";
import { UserProvider } from "@/app/provider/UserProvider";
import { GlobalErrorComponent } from "@/shared/components/Error/GlobalError";
import { cn } from "@/shared/misc";
import { useLayout } from "@/shared/hooks/useLayout";
import { LayoutProvider } from "@/app/provider/LayoutProvider";
import { RouterContext } from "@/main";
import { authQueries } from "@/shared/lib/auth/authQuery";
import React from "react";
import { LoadingAnimation } from "@/shared/components/Loading";

export const Route = createRootRouteWithContext<RouterContext>()({
  component: () => (
    <LayoutProvider>
      <UserProvider>
        <RootLayout>
          <React.Suspense fallback={<LoadingAnimation />}>
            <RootHeader />
          </React.Suspense>
          <RootSideBar />
          <Outlet />
        </RootLayout>
      </UserProvider>
    </LayoutProvider>
  ),
  loader: (opts) => opts.context.queryClient.ensureQueryData(authQueries),
  errorComponent: ({ error }) => <GlobalErrorComponent error={error} to="/" />,
});

const layoutStyles = {
  default: "max-w-[520px]",
  wide: "max-w-[1200px]",
} as const;

function RootLayout({ children }: { children: React.ReactNode }) {
  const { layoutType } = useLayout();

  return (
    <div
      id="root-layout"
      className={cn(
        "layout",
        `h-h-full ml-auto mr-auto grid max-h-[834px] w-full`,
        layoutStyles[layoutType],
      )}
    >
      {children}
    </div>
  );
}

export { RootLayout };
