import {
  WebSocketGateway,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketServer,
} from "@nestjs/websockets";
import { Server, Socket } from "socket.io";

interface UserInfo {
  nickname: string;
  role: string;
}

@WebSocketGateway({ namespace: "/chat", cors: true })
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage("joinRoom")
  handleJoinRoom(
    client: Socket,
    payload: { sender: UserInfo; channel: { roomId: string } },
  ) {
    const { channel } = payload;
    const roomId = channel.roomId;
    client.join(roomId);
  }

  @SubscribeMessage("leaveRoom")
  handleLeaveRoom(client: Socket, roomId: string) {
    client.leave(roomId);
  }

  @SubscribeMessage("sendMessage")
  handleMessage(
    client: Socket,
    payload: { sender: UserInfo; message: string; channel: { roomId: string } },
  ) {
    const { sender, message, channel } = payload;
    const roomId = channel.roomId;
    this.server.to(roomId).emit("message", {
      sender,
      message,
    });
  }
}
