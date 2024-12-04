import { LoginPage } from "@/features/login-page";
import { GlobalErrorComponent } from "@/shared/components/Error/GlobalError";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/login")({
  component: Component,
  loader: async () => {
    const tokenResponse = await fetch("/api/users/token");
    if (tokenResponse.ok) {
      throw redirect({
        to: "/my-page",
      });
    }
  },
  errorComponent: ({ error }) => <GlobalErrorComponent error={error} to="/" />,
});

function Component() {
  return <LoginPage />;
}
