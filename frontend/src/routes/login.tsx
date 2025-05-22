import { LoginPage } from "@/features/login-page";
import { GlobalErrorComponent } from "@/shared/components/Error/GlobalError";
import { authQueries } from "@/shared/lib/auth/authQuery";
import { AuthStatusTypeSchema } from "@/shared/lib/auth/guard";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/login")({
  component: Component,
  loader: async ({ context: { queryClient } }) => {
    const queryData = await queryClient.ensureQueryData(authQueries);
    const parsedData = AuthStatusTypeSchema.safeParse(queryData);

    if (parsedData.success && parsedData.data.isAuthenticated) {
      return redirect({
        to: "/my-page",
      });
    }
  },
  errorComponent: ({ error }) => <GlobalErrorComponent error={error} to="/" />,
});

function Component() {
  return <LoginPage />;
}
