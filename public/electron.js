const { BrowserWindow, app, remote, ipcMain } = require('electron');
const path = require('path');
const url = require('url');
const isDev = require('electron-is-dev');

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    frame: true,
    movable: true,
    resizable: false,
    backgroundColor: "#1d1d1d",
    title: "YTDownloader",
    icon: `${__dirname}/assets/app-logo.png`
    webPreferences: {
      preload: `${__dirname}/preload.js`,
      nodeIntegration: true,
      enableRemoteModule: true,
      contextIsolation: false,
      webSecurity: false,
    }
  });
  win.setMenu(null)
  
  win.loadURL
  (
    isDev 
    ? 'http://localhost:3000' 
    : `file://${path.join(__dirname, 'index.html')}`
  )

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