import { app, BrowserWindow } from "electron";
import path from "path";

function createWindow() {
	const mainWindow = new BrowserWindow({
		width: 500,
		height: 900,
		resizable: false,
		webPreferences: {
			preload: path.join(process.cwd(), "electron", "preload.ts"),
		},
	});

	const startUrl = "http://localhost:5173";
	mainWindow.loadFile(startUrl);
	mainWindow.loadURL(startUrl);
}

app.whenReady().then(() => {
	createWindow();

	app.on("activate", function () {
		if (BrowserWindow.getAllWindows().length === 0) createWindow();
	});
});

app.on("window-all-closed", () => {
	if (process.platform !== "darwin") {
		app.quit();
	}
});
