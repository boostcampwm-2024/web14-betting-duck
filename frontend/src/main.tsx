import "./index.css";
import App from "./App.tsx";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

async function enableMocking() {
	if (process.env.NODE_ENV === "development") {
		const { startMockServices } = await import("./mocks/browser");
		return startMockServices();
	}
}

enableMocking().then(() => {
	createRoot(document.getElementById("root")!).render(
		<StrictMode>
			<App />
		</StrictMode>,
	);
});
