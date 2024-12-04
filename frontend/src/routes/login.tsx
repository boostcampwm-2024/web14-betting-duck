import { LoginPage } from "@/features/login-page";
import { GlobalErrorComponent } from "@/shared/components/Error/GlobalError";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/login")({
  component: Component,
  beforeLoad: async () => {
    const response = await fetch("/api/users/token");
    if (!response.ok) {
      return;
    }
    throw redirect({
      to: "/my-page",
    });
  },
  errorComponent: ({ error }) => <GlobalErrorComponent error={error} to="/" />,
});

function Component() {
  return <LoginPage />;
}
