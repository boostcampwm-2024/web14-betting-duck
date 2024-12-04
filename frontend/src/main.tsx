import "./index.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";
import { Auth } from "@/shared/lib/auth/auth";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { GlobalErrorComponent } from "./shared/components/Error/GlobalError";

type RouterContext = {
  auth: Auth;
};

const router = createRouter({
  routeTree,
  context: {
    auth: {} as Auth,
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
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  </StrictMode>,
);

export { type RouterContext };
