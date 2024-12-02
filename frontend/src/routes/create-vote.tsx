import { CreateVotePage } from "@/features/create-vote";
import { createFileRoute } from "@tanstack/react-router";
import { ErrorComponent } from "@/shared/components/Error";
import { CreateVoteError } from "@/features/create-vote/ui/error/CreateVoteError";
import { ROUTES } from "@/shared/config/route";
import { requireAuth, requireUesrRole } from "@/shared/lib/auth/guard";

export const Route = createFileRoute("/create-vote")({
  component: RouteComponent,
  loader: async () => {
    const userInfo = await requireAuth({ to: ROUTES.CREATE_VOTE });
    requireUesrRole({ userInfo, to: ROUTES.CREATE_VOTE });
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
