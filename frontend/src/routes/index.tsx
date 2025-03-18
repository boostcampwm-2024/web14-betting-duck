import { authQueries } from "@/shared/lib/auth/authQuery";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  beforeLoad: ({ context }) => {
    const { queryClient } = context;
    const auth = queryClient.getQueryData(authQueries.queryKey);
    if (!auth) {
      throw redirect({
        to: "/login",
      });
    }

    throw redirect({
      to: "/my-page",
    });
  },
});
