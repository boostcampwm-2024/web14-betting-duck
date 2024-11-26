import { createFileRoute } from "@tanstack/react-router";
import { WaitingRoom } from "@/features/waiting-room";
import { WaitingError } from "@/features/waiting-room/ui/WaitingError";
import { AccessError } from "@/features/waiting-room/error/AccessError";
import { Unauthorized } from "@/features/waiting-room/error/Unauthorized";
import { Forbidden } from "@/features/waiting-room/error/Forbidden";
import { ErrorComponent } from "@/shared/components/Error";
import { validateAccess } from "@/shared/lib/validateAccess";
import { responseBetRoomInfo } from "@betting-duck/shared";
import { z } from "zod";

async function getBettingRoomInfo(roomId: string) {
  const response = await fetch(`/api/betrooms/${roomId}`);
  const json = await response.json();
  const { data } = json;
  const result = responseBetRoomInfo.safeParse(data);
  if (!result.success) {
    console.error(result.error.errors);
    throw new Error("배팅 룸 데이터를 불러오는데 실패했습니다.");
  }
  return result.data;
}

let returnToken = "";
export const Route = createFileRoute("/betting_/$roomId/waiting")({
  component: WaitingRoom,
  beforeLoad: async ({ params }) => {
    const { roomId } = params;
    returnToken = roomId;

    const abortController = new AbortController();
    await validateAccess(roomId, abortController.signal);
  },
  loader: async ({
    params,
  }): Promise<{
    roomId: string;
    bettingRoomInfo: z.infer<typeof responseBetRoomInfo>;
  }> => {
    const { roomId } = params;
    returnToken = roomId;

    try {
      const bettingRoomInfo = await getBettingRoomInfo(roomId);
      return { roomId, bettingRoomInfo };
    } catch (error) {
      if (error instanceof AccessError) {
        throw error;
      }
      throw new Error("방에 참여 할 수 없습니다");
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
