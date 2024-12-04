import { LoginPage } from "@/features/login-page";
import { GlobalErrorComponent } from "@/shared/components/Error/GlobalError";
import { authQueries } from "@/shared/lib/auth/authQuery";
import { createFileRoute, redirect } from "@tanstack/react-router";
import { AuthStatusTypeSchema } from "@/shared/lib/auth/guard";

export const Route = createFileRoute("/login")({
  component: Component,
  loader: async ({ context }) => {
    const query = context.queryClient.getQueryData(authQueries.queryKey);
    const parsed = AuthStatusTypeSchema.safeParse(query);
    if (parsed.success && parsed.data.isAuthenticated) {
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
