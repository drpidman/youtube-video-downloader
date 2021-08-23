import { BoxView, ViewerName } from "../workspace/BoxView";
import {
  ButtonGroup,
  DownSpace,
  DownSpaceBox,
  DropDown,
  DropItems,
  InputGroup,
  ProgressNotification,
  ProgressNotificationBody,
  ProgressNotificationHeader,
  ProgressNotificationNet,
} from "./View";

import React ,{ useState } from "react";

// downloadService
const { DownloadService } = window.require('@services/DownloadService');
const downloadService = new DownloadService();

export function DownloadView() {

  const [ DropVisible, setVisible ] = useState(false);
  const [ NotfVisible, NotfActive ] = useState(false);
  const [ btnContent, setBtnContent ] = useState('DOWNLOAD');

  /**
   *
   * @param {*} e preventDefaults
   */
  const dropdownToggler = (e: MouseEvent) => {
    e.preventDefault();
    if (DropVisible) {
      setVisible(false);
    } else {
      setVisible(true);
    }
  };


  /**
   * 
   * @param {*} e preventDefaults
   */
  const buttonDownload = (e: MouseEvent) => {
    e.preventDefault();
    const url = document.getElementById('download-url').value;
    if (url === '') return alert('Please, insert a url');

    setBtnContent('Processing...')

    downloadService.DownloadAudioEvent(url.toString(), JSON.parse(
      localStorage.getItem('audio-path')
    ).path);


    downloadService.on('audio:onProgress', (progress) => {
      setBtnContent('DOWNLOAD');
      NotfActive(true);
      document.getElementById('net-kbps').innerText = progress.currentKbps + 'Kbps';
    });
  }

  return (
    <div>
    <BoxView>
      <ViewerName>Download</ViewerName>
      <DownSpace>
        <DownSpaceBox>
          <label htmlFor="download-url">Youtube/Music</label>
          <InputGroup rotate={DropVisible}>
            <input
              id="download-url"
              placeholder="music.youtube.com"
              type="url"
            />
            <a role="button" onClick={dropdownToggler}>
              <i className="bi bi-caret-down"></i>
            </a>
          </InputGroup>
          <DropDown
            width={DropVisible}
            height={DropVisible}
            display={DropVisible}
          >
            <span style={{ visibility: DropVisible ? "visible" : "hidden" }}>
              formats
            </span>
            <DropItems display={DropVisible}>
              <ul>
                <li
                  role="button"
                  onClick={(e: MouseEvent) => {
                    e.preventDefault();
                    localStorage.setItem("downtype", "audio");
                  }}
                >
                  <a role="button">audio</a>
                </li>
                <li
                  role="button"
                  onClick={(e: MouseEvent) => {
                    e.preventDefault();
                    localStorage.setItem("downtype", "video");
                  }}
                >
                  <a>video</a>
                </li>
              </ul>
            </DropItems>
          </DropDown>
          <span>
            selected type:{" "}
            <span style={{ color: "yellow" }}>
              {localStorage.getItem("downtype") || "not selected"}
            </span>
          </span>
          <ButtonGroup>
            <button onClick={buttonDownload}>
              <i className="bi bi-download"></i>
               {
                 btnContent
               }
            </button>
          </ButtonGroup>
        </DownSpaceBox>
      </DownSpace>
    </BoxView>
    <ProgressNotification style={{ visibility: NotfVisible ? 'visible' : 'hidden' }}>
        <ProgressNotificationHeader>
          <div>
            <span>Download State</span>
          </div>
          <div style={{ justifyContent: "flex-end"}}>
            <a role="button" onClick={function(e) {
              e.preventDefault();
              NotfActive(false);
            }}>&times;</a>
          </div>
        </ProgressNotificationHeader>
        <ProgressNotificationBody>
          <ProgressNotificationNet>
            <span><i className="bi bi-reception-4"></i> Download Speed: </span>
          </ProgressNotificationNet>
          <ProgressNotificationNet>
            <span id="net-kbps"></span>
          </ProgressNotificationNet>
        </ProgressNotificationBody>
    </ProgressNotification>
    </div>
  );
}
