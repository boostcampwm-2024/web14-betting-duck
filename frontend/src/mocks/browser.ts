// src/mocks/browser.ts
import { setupWorker } from "msw/browser";
import { handlers, setupWebSocketServer } from "./chat/handler";

export const worker = setupWorker(...handlers);

export const startMockServices = async () => {
	await worker.start({
		onUnhandledRequest: "bypass",
	});

	setupWebSocketServer();

	console.log("🔶 Mock Service Worker started");
	console.log("🔶 WebSocket Server started on ws://localhost:8080");
};
