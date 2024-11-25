import { createFileRoute, redirect } from "@tanstack/react-router";
import { ErrorComponent } from "@/shared/ui/error";
import { MyPage } from "@/features/my-page";
import { ErrorMyPage } from "@/features/my-page/error";
import { ROUTES } from "@/shared/config/route";

export const Route = createFileRoute("/my-page")({
  beforeLoad: async () => {
    const response = await fetch("/api/users/token");
    if (!response.ok) {
      throw redirect({
        to: "/require-login",
        search: { from: encodeURIComponent(ROUTES.MYPAGE) },
      });
    }
  },
  component: MyPage,
  errorComponent: ({ error }) => (
    <ErrorComponent error={error} feature="마이 페이지" to="/demo-login">
      <ErrorMyPage />
    </ErrorComponent>
  ),
});
