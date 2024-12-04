import { createFileRoute } from "@tanstack/react-router";
import { WaitingRoom } from "@/features/waiting-room";
import { WaitingError } from "@/features/waiting-room/ui/WaitingError";
import { AccessError } from "@/features/waiting-room/error/AccessError";
import { Forbidden } from "@/features/waiting-room/error/Forbidden";
import { ErrorComponent } from "@/shared/components/Error";
import { responseBetRoomInfo } from "@betting-duck/shared";
import { z } from "zod";
import { getBettingRoomInfo } from "@/features/betting-page/api/getBettingRoomInfo";
import { GuestLoginForm } from "@/features/login-page/ui/components";

type BetRoomInfo = z.infer<typeof responseBetRoomInfo>;

let returnToken = "";
export const Route = createFileRoute("/betting_/$roomId/waiting")({
  component: WaitingRoom,
  loader: async ({
    params,
  }): Promise<{
    roomId: string;
    bettingRoomInfo: BetRoomInfo;
  }> => {
    const { roomId } = params;
    returnToken = roomId;
    try {
      const response = await fetch("/api/users/token");
      if (!response.ok) {
        throw new AccessError(
          "사용자 정보를 불러오는데 실패했습니다.",
          "UNAUTHORIZED",
        );
      }
    } catch (error) {
      console.log(error);
      throw new AccessError(
        "사용자 정보를 불러오는데 실패했습니다.",
        "UNAUTHORIZED",
      );
    }

    const bettingRoomInfo = await getBettingRoomInfo(roomId);
    if (!bettingRoomInfo) {
      throw new AccessError("방에 참여 할 수 없습니다", "FORBIDDEN");
    }

    return { roomId, bettingRoomInfo };
  },
  shouldReload: () => true,
  errorComponent: ({ error }) => {
    if (error instanceof AccessError) {
      if (error.code === "UNAUTHORIZED") {
        return (
          <div className="bg-layout-main relative flex h-full w-full flex-col justify-end pt-4">
            <div
              className="text-default absolute left-0 top-0 z-50 flex h-full w-full flex-col items-center justify-center gap-16 px-8"
              style={{
                backgroundColor: "oklch(37.92% 0.039 257.29 / 70%)",
                backdropFilter: "blur(10px)",
              }}
            >
              <GuestLoginForm
                to="/betting/$roomId/waiting"
                roomId={returnToken}
              />
            </div>
          </div>
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
