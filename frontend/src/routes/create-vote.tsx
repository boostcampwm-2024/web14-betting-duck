import { CreateVotePage } from "@/features/create-vote";
import { createFileRoute, redirect } from "@tanstack/react-router";
import { ErrorComponent } from "@/shared/components/Error";
import { CreateVoteError } from "@/features/create-vote/ui/error/CreateVoteError";
import { ROUTES } from "@/shared/config/route";
import { responseUserInfoSchema } from "@betting-duck/shared";

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

    const userResponse = await fetch("/api/users/userInfo");
    if (!userResponse.ok) {
      throw new Error("사용자 정보를 불러오는데 실패했습니다.");
    }
    const { data } = await userResponse.json();
    const userInfo = responseUserInfoSchema.safeParse(data);
    if (!userInfo.success) {
      throw new Error("사용자 정보를 파싱하는데 실패했습니다.");
    }
    if (userInfo.data.role === "guest") {
      throw redirect({
        to: "/require-login",
        search: { from: encodeURIComponent(ROUTES.GUEST_CREATE_VOTE) },
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
