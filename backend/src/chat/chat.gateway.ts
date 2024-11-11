import {
  WebSocketGateway,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketServer,
} from "@nestjs/websockets";
import { Server, Socket } from "socket.io";

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
  handleJoinRoom(client: Socket, room: string) {
    client.join(room);
    client
      .to(room)
      .emit("message", `User ${client.id} has joined the room: ${room}`);
  }

  @SubscribeMessage("leaveRoom")
  handleLeaveRoom(client: Socket, room: string) {
    client.leave(room);
    client
      .to(room)
      .emit("message", `User ${client.id} has left the room: ${room}`);
  }

  @SubscribeMessage("sendMessage")
  handleMessage(client: Socket, payload: { room: string; message: string }) {
    this.server
      .to(payload.room)
      .emit("message", `User ${client.id}: ${payload.message}`);
  }
}
