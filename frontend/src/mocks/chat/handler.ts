// src/mocks/handlers.ts
import { http, HttpResponse, delay, ws } from "msw";

// Types
interface ChatMessage {
	id: string;
	nickname: string;
	content: string;
	timestamp: number;
}

interface User {
	id: string;
	nickname: string;
	status: "online" | "offline";
}

// Mock Data Store
const messages: ChatMessage[] = [];
const users: User[] = [];
// WebSocket Server Setup
const setupWebSocketServer = () => {
	const wss = ws.link("ws://localhost:8080");

	wss.addEventListener("connection", (websocket) => {
		console.log("New WebSocket connection");

		websocket.client.addEventListener("message", (event) => {
			const data = event.data.toString();
			const message = JSON.parse(data);

			switch (message.type) {
				case "user.join": {
					const newUser: User = {
						id: message.payload.id,
						nickname: message.payload.nickname,
						status: "online",
					};
					users.push(newUser);

					wss.clients.forEach((client) => {
						client.send(
							JSON.stringify({
								type: "user.joined",
								payload: {
									user: newUser,
									timestamp: Date.now(),
								},
							}),
						);
					});
					break;
				}

				case "chat.message": {
					const newMessage: ChatMessage = {
						id: crypto.randomUUID(),
						...message.payload,
						timestamp: Date.now(),
					};
					messages.push(newMessage);

					wss.clients.forEach((client) => {
						client.send(
							JSON.stringify({
								type: "chat.message",
								payload: newMessage,
							}),
						);
					});
					break;
				}
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

	http.post("/api/chat/messages", async ({ request }) => {
		const { content, nickname } = (await request.json()) as ChatMessage;

		const newMessage: ChatMessage = {
			id: crypto.randomUUID(),
			nickname,
			content,
			timestamp: Date.now(),
		};

		messages.push(newMessage);

		await delay(100);

		return HttpResponse.json(newMessage, { status: 201 });
	}),

	http.post("/api/chat/join", async ({ request }) => {
		const { id, nickname } = (await request.json()) as ChatMessage;

		const user: User = {
			id,
			nickname,
			status: "online",
		};

		users.push(user);

		return HttpResponse.json({
			user,
			token: `mock-token-${crypto.randomUUID()}`,
		});
	}),
];

export { setupWebSocketServer };
