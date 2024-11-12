import {
  WebSocketGateway,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketServer,
} from "@nestjs/websockets";
import { Server, Socket } from "socket.io";

interface BetOption {
  name: string;
  currentBets: number;
  participants: number;
}

interface Channel {
  id: string;
  options: {
    option1: BetOption;
    option2: BetOption;
  };
  status: "waiting" | "active" | "finished";
}

interface RoomUser {
  nickname: string;
  clientId: string;
}

@WebSocketGateway({ namespace: "/betting", cors: true })
export class BetGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  //TODO: 예시임. 이후에 실제 DB 저장된 값으로 관리
  private channels: Channel[] = [
    {
      id: "bet-123",
      options: {
        option1: { name: "기아", currentBets: 0, participants: 0 },
        option2: { name: "삼성", currentBets: 0, participants: 0 },
      },
      //TODO: 상태도 상황에 맞게 수정
      status: "active",
    },
  ];

  private rooms: { [roomId: string]: RoomUser[] } = {};

  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
    for (const roomId in this.rooms) {
      if (this.rooms[roomId]) {
        this.rooms[roomId] = this.rooms[roomId].filter(
          (user) => user.clientId !== client.id,
        );
        const nicknames =
          this.rooms[roomId]?.map((user) => user.nickname) || [];
        this.server.to(roomId).emit("fetchRoomUsers", nicknames);
      }
    }
  }

  @SubscribeMessage("joinRoom")
  handleJoinRoom(
    client: Socket,
    payload: { roomId: string; nickname: string },
  ) {
    const { roomId, nickname } = payload;
    client.join(roomId);
    if (!this.rooms[roomId]) {
      this.rooms[roomId] = [];
    }
    this.rooms[roomId].push({ nickname, clientId: client.id });
    const nicknames = this.rooms[roomId].map((user) => user.nickname) || [];
    this.server.to(roomId).emit("fetchRoomUsers", nicknames);
  }

  @SubscribeMessage("leaveRoom")
  handleLeaveRoom(client: Socket, roomId: string) {
    client.leave(roomId);
    if (this.rooms[roomId]) {
      this.rooms[roomId] = this.rooms[roomId].filter(
        (user) => user.clientId !== client.id,
      );
    }

    let nicknames = [];
    if (this.rooms[roomId]) {
      nicknames = this.rooms[roomId].map((user) => user.nickname);
    }
    this.server.to(roomId).emit("fetchRoomUsers", nicknames);
  }

  @SubscribeMessage("fetchBetRoomInfo")
  handleFetchBetRoomInfo(client: Socket, channelId: string) {
    const channel = this.channels.find((ch) => ch.id === channelId);
    if (channel) {
      client.emit("fetchBetRoomInfo", { channel });
    } else {
      client.emit("fetchBetRoomInfo", {
        error: "해당하는 채널이 존재하지 않습니다.",
      });
    }
  }

  @SubscribeMessage("joinBet")
  handleJoinBet(
    client: Socket,
    payload: {
      sender: { nickname: string; betAmount: number; selectOption: string };
      channel: { id: string };
    },
  ) {
    const { sender, channel } = payload;
    const targetChannel = this.channels.find((ch) => ch.id === channel.id);

    if (targetChannel && targetChannel.status === "active") {
      const option = targetChannel.options[sender.selectOption];
      if (option) {
        option.currentBets += sender.betAmount;
        option.participants += 1;

        this.server.to(channel.id).emit("fetchBetRoomInfo", {
          channel: targetChannel,
        });
        //TODO: DB에 배팅 내역 저장 로직 추가
      } else {
        client.emit("joinBet", { error: "해당하는 옵션이 존재하지 않습니다." });
      }
    } else {
      client.emit("joinBet", { error: "해당하는 채널이 존재하지 않습니다." });
    }
  }
}
