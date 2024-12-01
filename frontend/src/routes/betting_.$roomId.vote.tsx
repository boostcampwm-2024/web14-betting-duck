import {
  createFileRoute,
  Outlet,
  ErrorComponent,
} from "@tanstack/react-router";
import { Chat } from "@/features/chat";
import { BettingProvider } from "@/features/betting-page/provider/BettingProvider";
import { cn } from "@/shared/misc";
import {
  responseBetRoomInfo,
  responseUserInfoSchema,
} from "@betting-duck/shared";
import { z } from "zod";
import { AccessError } from "@/features/waiting-room/error/AccessError";
import { Unauthorized } from "@/features/waiting-room/error/Unauthorized";
import { Forbidden } from "@/features/waiting-room/error/Forbidden";
import { loadBetRoomData } from "@/shared/lib/loader/useBetRoomLoader";
import { queryClient } from "@/shared/lib/auth/authQuery";
import { Suspense } from "react";
import { LoadingAnimation } from "@/shared/components/Loading";

type BetRoomResponse = z.infer<typeof responseBetRoomInfo>;

interface RouteLoaderData {
  roomId: string;
  bettingRoomInfo: BetRoomResponse;
  duckCoin: number;
  userInfo: z.infer<typeof responseUserInfoSchema>;
}

let returnToken = "";
export const Route = createFileRoute("/betting_/$roomId/vote")({
  loader: async ({ params, abortController }): Promise<RouteLoaderData> => {
    const { roomId } = params;
    returnToken = roomId;

    const { bettingRoomInfo, userInfo } = await loadBetRoomData({
      roomId,
      signal: abortController.signal,
      queryClient,
    });

    return { roomId, bettingRoomInfo, duckCoin: userInfo.duck, userInfo };
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
    <BettingProvider>
      <div className="flex">
        <Chat />
        <div
          className={cn(
            "betting-container",
            "border-secondary flex min-w-0.5 border-l-8",
          )}
        >
          <Suspense
            fallback={
              <div className="flex h-full w-full items-center justify-center">
                <LoadingAnimation />
              </div>
            }
          >
            <Outlet />
          </Suspense>
        </div>
      </div>
    </BettingProvider>
  );
}
