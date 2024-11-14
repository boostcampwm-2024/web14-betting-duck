// src/mocks/handlers.ts
import { http, HttpResponse, delay, ws } from "msw";

interface ChatMessage {
  sender: {
    nickname: string;
    role: "user" | "operator";
  };
  message: string;
}
// Types
interface User {
  id: string;
  nickname: string;
  status: "online" | "offline";
}

const isValidMessage = (message: ChatMessage): boolean => {
  return !!(
    message.sender &&
    typeof message.sender.nickname === "string" &&
    ["user", "operator"].includes(message.sender.role) &&
    typeof message.message === "string"
  );
};

// Mock Data Store
const messages: ChatMessage[] = [];
const users: User[] = [];
// WebSocket Server Setup
const setupWebSocketServer = () => {
  const wss = ws.link("ws://localhost:8080");

  wss.addEventListener("connection", (websocket) => {
    websocket.client.send("New WebSocket connection");

    websocket.server.addEventListener("message", (event) => {
      event.preventDefault();

      try {
        const receivedMessage: ChatMessage = JSON.parse(event.data.toString());

        if (isValidMessage(receivedMessage)) {
          websocket.client.send(
            JSON.stringify({
              error: "Invalid message format",
            }),
          );
        }

        const responseMessage = {
          sender: {
            nickname: receivedMessage.sender.nickname,
            role: receivedMessage.sender.role,
          },
          message: receivedMessage.message,
        };

        websocket.server.send(JSON.stringify(responseMessage));
      } catch (error) {
        console.error(`Error processing message:`, error);
        websocket.client.send(
          JSON.stringify({
            error: "Invalid message format",
          }),
        );
      }
    });

    websocket.client.addEventListener("close", () => {
      console.log("Client disconnected");
    });
  });
};

// HTTP Handlers
export const handlers = [
  http.get("/api/chat/messages", async ({ request }) => {
    const url = new URL(request.url);
    const limit = Number(url.searchParams.get("limit")) || 50;
    const offset = Number(url.searchParams.get("offset")) || 0;

    await delay(100);

    return HttpResponse.json({
      messages: messages.slice(offset, offset + limit),
      total: messages.length,
    });
  }),

  http.get("/api/chat/users", async () => {
    await delay(100);

    return HttpResponse.json({
      users: users.filter((user) => user.status === "online"),
    });
  }),
];

export { setupWebSocketServer };
