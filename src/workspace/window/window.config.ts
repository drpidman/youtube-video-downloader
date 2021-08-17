import { BrowserWindow } from "electron";


export function WindowConfig(windowConfig: BrowserWindow): void {
  // basic
  windowConfig.shadow = true;
  windowConfig.resizable = false;
  windowConfig.removeMenu();
  windowConfig.setTitle("YTDownloader");
}