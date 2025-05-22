import { createFileRoute, redirect } from "@tanstack/react-router";
import { ErrorComponent } from "@/shared/components/Error";
import { MyPage } from "@/features/my-page";
import { ErrorMyPage } from "@/features/my-page/error";
import { ROUTES } from "@/shared/config/route";

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
  component: MyPage,
  shouldReload: () => true,
  errorComponent: ({ error }) => {
    return (
      <ErrorComponent error={error} feature="마이 페이지" to="/login">
        <ErrorMyPage />
      </ErrorComponent>
    );
  },
});
