import { CreateVotePage } from "@/features/create-vote";
import { createFileRoute, redirect } from "@tanstack/react-router";
import { ErrorComponent } from "@/shared/components/Error";
import { CreateVoteError } from "@/features/create-vote/ui/error/CreateVoteError";
import { ROUTES } from "@/shared/config/route";

export const Route = createFileRoute("/create-vote")({
  component: RouteComponent,
  beforeLoad: async () => {
    const response = await fetch("/api/users/token");
    if (!response.ok) {
      throw redirect({
        to: "/require-login",
        search: { from: encodeURIComponent(ROUTES.CREATE_VOTE) },
      });
    }
  },
  errorComponent: ({ error }) => (
    <ErrorComponent error={error} feature="투표 생성 페이지" to="/login">
      <CreateVoteError />
    </ErrorComponent>
  ),
});

function RouteComponent() {
  return <CreateVotePage />;
}
