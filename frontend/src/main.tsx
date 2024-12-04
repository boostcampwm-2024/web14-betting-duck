import "./index.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
import { Auth } from "@/shared/lib/auth/auth";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { GlobalErrorComponent } from "./shared/components/Error/GlobalError";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});

type RouterContext = {
  auth: Auth;
  queryClient: QueryClient;
};

const router = createRouter({
  routeTree,
  context: {
    auth: {} as Auth,
    queryClient,
  } as RouterContext,
  defaultPreload: "intent",
  defaultErrorComponent: ({ error }) => (
    <GlobalErrorComponent error={error} to={"/"} />
  ),
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

const theme = createTheme();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <RouterProvider router={router} />
      </ThemeProvider>
    </QueryClientProvider>
  </StrictMode>,
);

export { type RouterContext };
