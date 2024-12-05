import { createFileRoute } from "@tanstack/react-router";
import { WaitingRoom } from "@/features/waiting-room";
import { WaitingError } from "@/features/waiting-room/ui/WaitingError";
import { AccessError } from "@/features/waiting-room/error/AccessError";
import { Forbidden } from "@/features/waiting-room/error/Forbidden";
import { ErrorComponent } from "@/shared/components/Error";
import { getBettingRoomInfo } from "@/features/betting-page/api/getBettingRoomInfo";
import { GuestLoginForm } from "@/features/login-page/ui/components";
import { bettingRoomQueryKey } from "@/shared/lib/bettingRoomInfo";
import {
  getSessionItem,
  setSessionItem,
} from "@/shared/hooks/useSessionStorage";

let returnToken = "";
export const Route = createFileRoute("/betting_/$roomId/waiting")({
  component: WaitingRoom,
  loader: async ({ params, context: { queryClient } }) => {
    const { roomId } = params;
    const sessionData = await getSessionItem("userInfo");
    await setSessionItem(
      "userInfo",
      JSON.stringify({
        ...JSON.parse(sessionData),
        roomId,
      }),
    );

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
    await queryClient.ensureQueryData({
      queryKey: bettingRoomQueryKey(roomId),
      queryFn: () => getBettingRoomInfo(roomId),
    });
  },
  shouldReload: () => true,
  errorComponent: ({ error }) => {
    if (error instanceof AccessError) {
      if (error.code === "UNAUTHORIZED") {
        return (
          <div className="bg-layout-main relative flex h-full w-full flex-col justify-end pt-4">
            <div
              className="text-default absolute left-0 top-0 z-50 flex h-full w-full flex-col items-center justify-center gap-16 px-6"
              style={{
                backgroundColor: "oklch(37.92% 0.039 257.29 / 70%)",
                backdropFilter: "blur(10px)",
              }}
            >
              <div>
                <h1 className="text-layout-main text-xl font-extrabold">
                  비 회원 로그인을 이용하여 참여 해주세요!
                </h1>
                <p className="text-layout-main pt-4 text-lg font-extrabold">
                  아래에 참여하고 싶은 닉네임을 입력 후 로그인을 눌러주세요!
                </p>
              </div>
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
