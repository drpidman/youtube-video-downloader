// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.

import * as electron from 'electron';
import * as os from 'os';
import * as path from 'path';
import DMusicService from './workspace/services/DMusicService';
import { styles } from './workspace/window/window.loader.styles';
import { remote } from 'electron';
const { app } = remote;


//@ts-ignore
import { version } from './package.json';

process.once('loaded', () => {

  // set true in : enableRemoteModule:true = main.ts
  const defaultsPath = {
    audio: () => {
      return app.getPath('music');
    },
    video: () => {
      return app.getPath('videos');
    }
  }
  // @ts-ignore
  global.musicService = new DMusicService();
  //@ts-ignore
  global.UserOS = defaultsPath;
  //@ts-ignore
  global.UserPath = path;
  //@ts-ignore
  global.windowStyles = styles;
  //@ts-ignore
  global.AppVersion = version;
  //@ts-ignore
  global.require = async function(m: string) {
    const module = await import(`${m}`);
    return module;
  }

});