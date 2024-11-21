import { createFileRoute } from "@tanstack/react-router";
import { WaitingRoom } from "@/features/waiting-room";
import { WaitingError } from "@/features/waiting-room/ui/WaitingError";
import { AccessError } from "@/features/waiting-room/error/AccessError";
import { Unauthorized } from "@/features/waiting-room/error/Unauthorized";
import { Forbidden } from "@/features/waiting-room/error/Forbidden";
import { ErrorComponent } from "@/shared/ui/error";
import { validateAccess } from "@/shared/lib/validateAccess";

let returnToken = "";
export const Route = createFileRoute("/voting_/$roomId/waiting")({
  component: WaitingRoom,
  loader: async ({ params }) => {
    const { roomId } = params;
    returnToken = roomId;

    const abortController = new AbortController();
    try {
      await validateAccess(roomId, abortController.signal);
      return { roomId };
    } finally {
      abortController.abort();
    }
  },
  errorComponent: ({ error }) => {
    if (error instanceof AccessError) {
      if (error.code === "UNAUTHORIZED") {
        return (
          <Unauthorized error={error} returnToken={returnToken}>
            <WaitingError />
          </Unauthorized>
        );
      }
      return (
        <Forbidden error={error}>
          <WaitingError />
        </Forbidden>
      );
    }
    return (
      <ErrorComponent
        error={error}
        feature="방에 참여 할 수 없습니다"
        to="/login"
      >
        <WaitingError />
      </ErrorComponent>
    );
  },
});
