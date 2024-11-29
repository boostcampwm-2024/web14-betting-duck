import {
  createFileRoute,
  Outlet,
  ErrorComponent,
} from "@tanstack/react-router";
import { Chat } from "@/features/chat";
import { BettingProvider } from "@/features/betting-page/provider/BettingProvider";
import { cn } from "@/shared/misc";
import { responseBetRoomInfo } from "@betting-duck/shared";
import { z } from "zod";
import { validateAccess } from "@/shared/lib/validateAccess";
import { getBettingRoomInfo } from "@/features/betting-page/api/getBettingRoomInfo";
import { getUserInfo } from "@/features/betting-page/api/getUserInfo";
import { AccessError } from "@/features/waiting-room/error/AccessError";
import { Unauthorized } from "@/features/waiting-room/error/Unauthorized";
import { Forbidden } from "@/features/waiting-room/error/Forbidden";

type BetRoomResponse = z.infer<typeof responseBetRoomInfo>;

interface RouteLoaderData {
  roomId: string;
  bettingRoomInfo: BetRoomResponse;
  duckCoin: number;
}

const STORAGE_KEY = "betting_pool";

let returnToken = "";
export const Route = createFileRoute("/betting_/$roomId/vote")({
  beforeLoad: () => {
    const rootLayout = document.getElementById("root-layout");
    rootLayout?.classList.add("betting-page");
  },
  loader: async ({ params }): Promise<RouteLoaderData> => {
    const { roomId } = params;
    returnToken = roomId;

    const abortController = new AbortController();
    try {
      await validateAccess(roomId, abortController.signal);
      const bettingRoomInfo = await getBettingRoomInfo(roomId);
      if (!bettingRoomInfo) {
        throw new Error("베팅 룸 데이터를 불러오는데 실패했습니다.");
      }

      const { duck } = await getUserInfo();
      return { roomId, bettingRoomInfo, duckCoin: duck };
    } finally {
      abortController.abort();
    }
  },
  onLeave: () => {
    const rootLayout = document.getElementById("root-layout");
    if (rootLayout) rootLayout.classList.remove("betting-page");
    if (!window) return;
    window.sessionStorage.removeItem(STORAGE_KEY);
  },
  component: RouteComponent,
  errorComponent: ({ error }) => {
    if (error instanceof AccessError) {
      if (error.code === "UNAUTHORIZED") {
        return (
          <Unauthorized error={error} returnToken={returnToken}>
            <ErrorComponent error={error} />
          </Unauthorized>
        );
      }
      return (
        <Forbidden error={error}>
          <ErrorComponent error={error} />
        </Forbidden>
      );
    }
    return <ErrorComponent error={error} />;
  },
});

function RouteComponent() {
  return (
    <div className="flex">
      <Chat />
      <div
        className={cn(
          "betting-container",
          "border-secondary flex min-w-0.5 border-l-8",
        )}
      >
        <BettingProvider>
          <Outlet />
        </BettingProvider>
      </div>
    </div>
  );
}
