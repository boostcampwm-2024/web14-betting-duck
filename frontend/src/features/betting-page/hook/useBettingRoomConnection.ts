import React from "react";
import { z } from "zod";
import { responseBetRoomInfo } from "@betting-duck/shared";
import { useSocketIO } from "@/shared/hooks/useSocketIo";

function useBettingConnection(
  socket: ReturnType<typeof useSocketIO>,
  bettingRoomInfo: z.infer<typeof responseBetRoomInfo>,
) {
  React.useEffect(() => {
    if (!socket.isConnected) return;
    socket.emit("joinRoom", {
      channel: {
        roomId: bettingRoomInfo.channel.id,
      },
    });
  }, [socket, bettingRoomInfo]);

  React.useEffect(() => {
    if (!socket.isConnected || bettingRoomInfo.channel.status !== "active")
      return;
    socket.emit("fetchBetRoomInfo", {
      roomId: bettingRoomInfo.channel.id,
    });
  }, [socket, bettingRoomInfo]);
}

export { useBettingConnection };
