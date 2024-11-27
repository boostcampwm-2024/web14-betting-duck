import "./index.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen.ts";
import { Auth } from "@/shared/lib/auth.ts";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { GlobalErrorComponent } from "./shared/components/Error/GlobalError.tsx";

const router = createRouter({
  routeTree,
  context: {
    auth: Auth,
  },
  defaultPreload: "intent",
  defaultErrorComponent: ({ error, reset }) => (
    <GlobalErrorComponent error={error} reset={reset} />
  ),
});

const theme = createTheme();

declare module "@tanstack/react-router" {
  interface RouterState {
    router: typeof router;
  }
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  </StrictMode>,
);
