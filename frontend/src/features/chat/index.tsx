import { ChatHeader } from "@/features/chat/ui/ChatHeader";
import { ChatInput } from "@/features/chat/ui/ChatInput";
import { ChatMessages } from "@/features/chat/ui/ChatMessages";
import { ChatProvider } from "./provider/ChatProvider";
import { cn } from "@/shared/misc";
import { useLoaderData } from "@tanstack/react-router";
import React from "react";
import { LoadingAnimation } from "@/shared/components/Loading";
import { useSuspenseQuery } from "@tanstack/react-query";
import { bettingRoomQueryKey } from "@/shared/lib/bettingRoomInfo";
import { getBettingRoomInfo } from "../betting-page/api/getBettingRoomInfo";
import { BettingRoomInfoSchema } from "@/shared/types";
import { authQueries } from "@/shared/lib/auth/authQuery";

function Chat() {
  const { roomId } = useLoaderData({
    from: "/betting_/$roomId/vote",
  });
  const { data } = useSuspenseQuery({
    queryKey: bettingRoomQueryKey(roomId),
    queryFn: () => getBettingRoomInfo(roomId),
  });
  const parsedData = BettingRoomInfoSchema.safeParse(data);
  if (!parsedData.success) {
    throw new Error("방 정보를 불러오는데 실패했습니다.");
  }
  const { channel } = parsedData.data;

  const { data: authData } = useSuspenseQuery({
    queryKey: authQueries.queryKey,
    queryFn: authQueries.queryFn,
  });
  const nickname = authData?.userInfo?.nickname;

  return (
    <ChatProvider>
      <div
        className={cn(
          "chatting-container",
          "bg-layout-main relative flex flex-col justify-end pt-4",
        )}
      >
        <ChatHeader bettingRoomInfo={parsedData.data} />
        <React.Fragment>
          {channel.status === "active" || channel.status === "timeover" ? (
            <React.Fragment>
              <ChatMessages nickname={nickname} />
              <ChatInput nickname={nickname} />
            </React.Fragment>
          ) : (
            <div className="flex h-full w-full flex-col items-center justify-center">
              <LoadingAnimation />
              <p className="pb-16 text-lg">
                베팅이 종료되어 채팅이 비활성화 되었습니다
              </p>
            </div>
          )}
        </React.Fragment>
      </div>
    </ChatProvider>
  );
}

export { Chat };
