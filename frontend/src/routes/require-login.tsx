import { createFileRoute } from "@tanstack/react-router";
import { ErrorComponent } from "@/shared/ui/error";
import { CreateVoteError } from "@/features/create-vote/ui/error/CreateVoteError";
import { z } from "zod";
import { ErrorMyPage } from "@/features/my-page/error";
import { ROUTE_PATH_ENUM, ROUTES } from "@/shared/config/route";
import { WaitingError } from "@/features/waiting-room/ui/WaitingError";

const searchSchema = z.object({
  from: z
    .string()
    .transform((val) => decodeURIComponent(val))
    .pipe(ROUTE_PATH_ENUM),
});

export const Route = createFileRoute("/require-login")({
  component: RouteComponent,
});

function RouteComponent() {
  const searchParam = Route.useSearch();
  const result = searchSchema.safeParse(searchParam);
  if (!result.success) {
    return <div></div>;
  }

  const { from } = result.data;
  if (from === ROUTES.CREATE_VOTE) {
    return (
      <ErrorComponent feature="투표 생성 페이지" to="/login">
        <CreateVoteError />
      </ErrorComponent>
    );
  }

  if (from === ROUTES.MYPAGE) {
    return (
      <ErrorComponent feature="마이 페이지" to="/login">
        <ErrorMyPage />
      </ErrorComponent>
    );
  }

  if (from === ROUTES.BETTING) {
    return (
      <ErrorComponent feature="투표 페이지" to="/login">
        <WaitingError />
      </ErrorComponent>
    );
  }

  return <div></div>;
}
