import { ChatHeader } from "@/features/chat/ui/ChatHeader";
import { ChatInput } from "@/features/chat/ui/ChatInput";
import { ChatMessages } from "@/features/chat/ui/ChatMessages";
import { ChatProvider } from "./provider/ChatProvider";
import { cn } from "@/shared/misc";
import { useLoaderData } from "@tanstack/react-router";
import React from "react";
import { LoadingAnimation } from "@/shared/components/Loading";

function Chat() {
  const { bettingRoomInfo } = useLoaderData({
    from: "/betting_/$roomId/vote",
  });

  return (
    <ChatProvider>
      <div
        className={cn(
          "chatting-container",
          "bg-layout-main relative flex flex-col justify-end pt-4",
        )}
      >
        <ChatHeader />
        <React.Fragment>
          {bettingRoomInfo.channel.status === "active" ||
          bettingRoomInfo.channel.status === "timeover" ? (
            <React.Fragment>
              <ChatMessages />
              <ChatInput />
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
