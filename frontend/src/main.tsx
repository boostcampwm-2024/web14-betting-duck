import "./index.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen.ts";
import { Provider } from "@/components/ui/provider";
import { Auth } from "@/shared/lib/auth.ts";

const router = createRouter({
  routeTree,
  context: {
    auth: Auth,
  },
  defaultPreload: "intent",
});

declare module "@tanstack/react-router" {
  interface RouterState {
    router: typeof router;
  }
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
);
