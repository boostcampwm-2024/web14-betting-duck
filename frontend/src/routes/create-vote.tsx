import { CreateVotePage } from "@/features/create-vote";
import { createFileRoute } from "@tanstack/react-router";
import { ErrorComponent } from "@/shared/ui/error";
import { CreateVoteError } from "@/features/create-vote/ui/error/CreateVoteError";

export const Route = createFileRoute("/create-vote")({
  component: RouteComponent,
  loader: async () => {
    const response = await fetch("/api/users/token");
    if (!response.ok) {
      throw new Error("로그인이 필요합니다.");
    }
  },
  errorComponent: ({ error }) => (
    <ErrorComponent error={error} feature="투표 생성 페이지" to="/demo-login">
      <CreateVoteError />
    </ErrorComponent>
  ),
});

function RouteComponent() {
  return <CreateVotePage />;
}
