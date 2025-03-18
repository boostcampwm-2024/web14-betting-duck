import { RouterProvider, createRouter } from "@tanstack/react-router";
import { routeTree } from "@/routeTree.gen";
import { Auth, AuthState } from "./lib/auth";
import { GlobalErrorComponent } from "@/shared/components/Error/GlobalError";
import { QueryClient } from "@tanstack/react-query";
import { RecoilState } from "recoil";

type RouterContext = {
  auth: RecoilState<AuthState>;
  queryClient: QueryClient;
};

const createGlobalRouter = (queryClient: QueryClient) =>
  createRouter({
    routeTree,
    context: {
      auth: Auth,
      queryClient,
    } as RouterContext,
    defaultPreload: "intent",
    defaultErrorComponent: ({ error }) => (
      <GlobalErrorComponent error={error} to={"/"} />
    ),
  });

function GlobalRouter({ queryClient }: { queryClient: QueryClient }) {
  const router = createGlobalRouter(queryClient);
  return <RouterProvider router={router} />;
}

declare module "@tanstack/react-router" {
  interface Register {
    router: ReturnType<typeof createGlobalRouter>;
  }
}

export { GlobalRouter };
export type { RouterContext };
