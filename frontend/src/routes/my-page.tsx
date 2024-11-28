import { createFileRoute, redirect } from "@tanstack/react-router";
import { ErrorComponent } from "@/shared/components/Error";
import { MyPage } from "@/features/my-page";
import { ErrorMyPage } from "@/features/my-page/error";
import { ROUTES } from "@/shared/config/route";
import { responseUserInfoSchema } from "@betting-duck/shared";

async function getUserInfo() {
  const response = await fetch("/api/users/userInfo");
  if (!response.ok) {
    throw new Error("사용자 정보를 불러오는데 실패했습니다.");
  }

  const { data } = await response.json();
  const result = responseUserInfoSchema.safeParse(data);
  if (!result.success) {
    console.error(result.error);
    throw new Error("사용자 정보를 불러오는데 실패했습니다.");
  }

  return result.data;
}

export const Route = createFileRoute("/my-page")({
  beforeLoad: async () => {
    const tokenResponse = await fetch("/api/users/token");
    if (!tokenResponse.ok) {
      throw redirect({
        to: "/require-login",
        search: { from: encodeURIComponent(ROUTES.MYPAGE) },
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
        search: { from: encodeURIComponent(ROUTES.GUEST_LOGIN) },
      });
    }
  },
  loader: async () => {
    const userInfo = await getUserInfo();
    return userInfo;
  },
  component: MyPage,
  errorComponent: ({ error }) => (
    <ErrorComponent error={error} feature="마이 페이지" to="/demo-login">
      <ErrorMyPage />
    </ErrorComponent>
  ),
});
