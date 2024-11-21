import { createFileRoute } from "@tanstack/react-router";
import { ErrorComponent } from "@/shared/ui/error";
import { MyPage } from "@/features/my-page";
import { ErrorMyPage } from "@/features/my-page/error";

export const Route = createFileRoute("/my-page")({
  component: MyPage,
  loader: async () => {
    const response = await fetch("/api/users/token");
    if (!response.ok) {
      throw new Error("로그인이 필요합니다.");
    }
  },
  errorComponent: ({ error }) => (
    <ErrorComponent error={error} feature="마이 페이지" to="/demo-login">
      <ErrorMyPage />
    </ErrorComponent>
  ),
});
