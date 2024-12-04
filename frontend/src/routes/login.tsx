import { LoginPage } from "@/features/login-page";
import { GlobalErrorComponent } from "@/shared/components/Error/GlobalError";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/login")({
  component: Component,
  errorComponent: ({ error }) => <GlobalErrorComponent error={error} to="/" />,
});

function Component() {
  return <LoginPage />;
}
