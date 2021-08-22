import React from 'react';

import { BoxView, ViewerName } from "../workspace/BoxView";
import { AppDetails, AppDetailsBox } from "./View";

/**
 * 
 * @param {string
 * } appDetails
 * @returns 
 */
export function MainView() {
  const version = window.require('electron').remote.app.getVersion();
  const appPath = window.require('electron').remote.app.getAppPath();

  let audioDir = JSON.parse(localStorage.getItem('audio-path')).path, 
  videoDir = JSON.parse(localStorage.getItem('video-path')).path;

  return (
    <BoxView>
      <ViewerName>Home</ViewerName>
      <AppDetails>
        <AppDetailsBox>
          <span id="app:version">app:version: <span style={{ color: "yellow" }}>{version}</span></span>
          <span id="app:audio_path">app:audio-path: <span style={{color: "yellow"}}>{audioDir}</span></span>
          <span id="app:video_path">app:video-path: <span style={{color: "yellow"}}>{videoDir}</span></span>
          <span id="app:app_path">app:path <span style={{color: "yellow"}}>{appPath}</span></span>
        </AppDetailsBox>
      </AppDetails>
    </BoxView>
  )
}