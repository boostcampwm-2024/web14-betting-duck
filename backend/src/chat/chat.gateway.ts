import {
  WebSocketGateway,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketServer,
} from "@nestjs/websockets";
import { Server, Socket } from "socket.io";
import {
  sendMessageRequestSchema,
  sendMessageRequestType,
} from "@shared/schemas/chat/socket/request";
import {
  joinRoomRequestSchema,
  joinRoomRequestType,
  leaveRoomRequestSchema,
  leaveRoomRequestType,
} from "@shared/schemas/shared";
import { UseFilters, UseGuards } from "@nestjs/common";
import { GlobalWsExceptionFilter } from "src/utils/filters/global-ws-exception-filter";
import { AuthenticatedGuard } from "src/utils/guards/authenticated-guard";

@UseFilters(new GlobalWsExceptionFilter())
@WebSocketGateway({ namespace: "api/chat", cors: true })
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  @UseGuards(AuthenticatedGuard)
  @SubscribeMessage("joinRoom")
  handleJoinRoom(client: Socket, payload: joinRoomRequestType) {
    const { channel } = joinRoomRequestSchema.parse(payload);
    const roomId = channel.roomId;
    client.join(roomId);
  }

  @SubscribeMessage("leaveRoom")
  handleLeaveRoom(client: Socket, payload: leaveRoomRequestType) {
    const { roomId } = leaveRoomRequestSchema.parse(payload);
    client.leave(roomId);
  }

  @SubscribeMessage("sendMessage")
  handleMessage(client: Socket, payload: sendMessageRequestType) {
    const { sender, message, channel } =
      sendMessageRequestSchema.parse(payload);
    console.log(sender, message, channel);
    const roomId = channel.roomId;
    this.server.to(roomId).emit("message", {
      sender,
      message,
    });
  }
}
