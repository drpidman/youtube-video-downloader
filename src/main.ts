import { app, BrowserWindow, Tray } from "electron";
import * as path from "path";
import { WindowConfig } from "./workspace/window/window.config";


function createWindow() {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    height: 600,
    width: 800,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: false,
      nodeIntegration: false,
      enableRemoteModule: true
    },
    backgroundColor: "#1d1d1d",
    icon: __dirname + '/workspace/icons/logo.png'
  });
  WindowConfig(mainWindow);
  mainWindow.loadFile(path.join(__dirname, 'workspace', 'public', 'index.html'))
}
app.on("ready", () => {
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