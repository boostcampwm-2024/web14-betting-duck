import { LoginPage } from "@/features/login-page";
import { GlobalErrorComponent } from "@/shared/components/Error/GlobalError";
import { createFileRoute } from "@tanstack/react-router";
import { ProtectedRoute } from "@/shared/components/ProtectedRoute";

export const Route = createFileRoute("/login")({
  component: () => (
    <ProtectedRoute>
      <LoginPage />
    </ProtectedRoute>
  ),
  errorComponent: ({ error }) => <GlobalErrorComponent error={error} to="/" />,
});
