import { createFileRoute, redirect } from "@tanstack/react-router";
import { ErrorComponent } from "@/shared/components/Error";
import { MyPage } from "@/features/my-page";
import { ErrorMyPage } from "@/features/my-page/error";
import { ROUTES } from "@/shared/config/route";
import { userInfoQueries } from "@/shared/hooks/useUserInfo";
import { responseUserInfoSchema } from "@betting-duck/shared";

export const Route = createFileRoute("/my-page")({
  beforeLoad: async () => {
    const tokenResponse = await fetch("/api/users/token", {
      headers: {
        "Cache-Control": "stale-while-revalidate",
        Pragma: "no-cache",
      },
      credentials: "include",
    });
    if (!tokenResponse.ok) {
      throw redirect({
        to: "/require-login",
        search: { from: encodeURIComponent(ROUTES.MYPAGE) },
      });
    }
  },
  loader: async ({ context: { queryClient } }) => {
    const userInfoData = await queryClient.ensureQueryData(userInfoQueries);
    const userInfo = responseUserInfoSchema.safeParse(userInfoData);
    if (!userInfo.success) {
      throw new Error("사용자 정보를 불러오는데 실패했습니다");
    }
    if (userInfo.data.role === "guest") {
      throw redirect({
        to: "/require-login",
        search: { from: encodeURIComponent(ROUTES.GUEST_LOGIN) },
      });
    }
    return { userInfo: userInfo.data };
  },
  component: MyPage,
  errorComponent: ({ error }) => (
    <ErrorComponent error={error} feature="마이 페이지" to="/demo-login">
      <ErrorMyPage />
    </ErrorComponent>
  ),
});
