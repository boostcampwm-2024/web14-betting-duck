import { createFileRoute } from "@tanstack/react-router";
import { ErrorComponent } from "@/shared/components/Error";
import { MyPage } from "@/features/my-page";
import { ErrorMyPage } from "@/features/my-page/error";
import { ProtectedRoute } from "@/shared/components/ProtectedRoute";

export const Route = createFileRoute("/my-page")({
  component: () => {
    return (
      <ProtectedRoute>
        <MyPage />
      </ProtectedRoute>
    );
  },
  shouldReload: () => true,
  errorComponent: ({ error }) => {
    return (
      <ErrorComponent error={error} feature="마이 페이지" to="/login">
        <ErrorMyPage />
      </ErrorComponent>
    );
  },
});
