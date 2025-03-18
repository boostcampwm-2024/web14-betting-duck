import { Suspense } from "react";
import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import { UserProvider } from "@/app/provider/UserProvider";
import { GlobalErrorComponent } from "@/shared/components/Error/GlobalError";
import { LayoutProvider } from "@/app/provider/LayoutProvider";
import { RouterContext } from "@/app/provider/RouterProvider";
import { LoadingAnimation } from "@/shared/components/Loading";
import { Layout } from "@/app/layout";

export const Route = createRootRouteWithContext<RouterContext>()({
  component: () => (
    <LayoutProvider>
      <UserProvider>
        <Layout>
          <Suspense fallback={<LoadingAnimation />}>
            <Outlet />
          </Suspense>
        </Layout>
      </UserProvider>
    </LayoutProvider>
  ),
  errorComponent: ({ error }) => <GlobalErrorComponent error={error} to="/" />,
});
