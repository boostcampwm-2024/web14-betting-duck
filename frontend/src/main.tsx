import "./index.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
import { Auth } from "@/shared/lib/auth/auth";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { GlobalErrorComponent } from "./shared/components/Error/GlobalError";
import { QueryClient } from "@tanstack/react-query";
import { queryClient } from "@/shared/lib/auth/authQuery";

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
  defaultErrorComponent: ({ error, reset }) => (
    <GlobalErrorComponent error={error} reset={reset} />
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
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  </StrictMode>,
);

export { type RouterContext };
