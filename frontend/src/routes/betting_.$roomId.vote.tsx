import {
  createFileRoute,
  Outlet,
  ErrorComponent,
} from "@tanstack/react-router";
import { Chat } from "@/features/chat";
import { cn } from "@/shared/misc";
import { AccessError } from "@/features/waiting-room/error/AccessError";
import { Unauthorized } from "@/features/waiting-room/error/Unauthorized";
import { Forbidden } from "@/features/waiting-room/error/Forbidden";
import { Suspense } from "react";
import { LoadingAnimation } from "@/shared/components/Loading";
import { bettingRoomQueryKey } from "@/shared/lib/bettingRoomInfo";
import { getBettingRoomInfo } from "@/features/betting-page/api/getBettingRoomInfo";
import { useSuspenseQuery } from "@tanstack/react-query";

interface RouteLoaderData {
  roomId: string;
}

const returnToken = "";
export const Route = createFileRoute("/betting_/$roomId/vote")({
  loader: async ({
    params,
    context: { queryClient },
  }): Promise<RouteLoaderData> => {
    const { roomId } = params;
    await queryClient.ensureQueryData({
      queryKey: bettingRoomQueryKey(roomId),
      queryFn: () => getBettingRoomInfo(roomId),
    });

    return {
      roomId,
    };
  },
  shouldReload: () => true,
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
  const { roomId } = Route.useLoaderData();
  useSuspenseQuery({
    queryKey: bettingRoomQueryKey(roomId),
    queryFn: () => getBettingRoomInfo(roomId),
  });

  return (
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
  );
}
