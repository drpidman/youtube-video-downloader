// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process unless
// nodeIntegration is set to true in webPreferences.
// Use preload.js to selectively enable features
// needed in the renderer process.

interface Window {
  musicService: any;
  UserOS: any;
  UserPath: any;
  windowStyles: any;
  AppVersion: string;
  require: NodeJS.Require;
}

interface HTMLStyleElement {
  styleSheet: any;
}


const App = {
  storage: {
    get(name: string) {
      return localStorage.getItem(name);
    },
    set(item: string, val: string) {
      return localStorage.setItem(item, val);
    },
  },

  loadStyles: (styles: string) => {
    const css = <HTMLStyleElement>document.createElement("style");
    css.type = "text/css";
    if (css.styleSheet) css.styleSheet.cssText = styles;
    else css.appendChild(document.createTextNode(styles));

    document.getElementsByTagName("head")[0].appendChild(css);
  },

  loadElements: (HTMLTemplate: string) => {
    const bodyElement = document.body;
    bodyElement.innerHTML = HTMLTemplate;
  },

  loadDefaultDirectories() {
    App.storage.set(
      "audio-path",
      JSON.stringify({ path: window.UserOS.audio() })
    );
    App.storage.set(
      "video-path",
      JSON.stringify({ path: window.UserOS.video() })
    );
  },

  setPathsVerified: (audioPath: string, videoPath: string) => {
    App.storage.set("audio-path", JSON.stringify({ path: audioPath }));
    App.storage.set("video-path", JSON.stringify({ path: videoPath }));
  },

  inputManager: {
    get(inputSelector: string) {
      return (<HTMLInputElement>document.getElementById(inputSelector)).value;
    },

    reset(inputSelector: string) {
      (<HTMLInputElement>document.getElementById(inputSelector)).value = "";
    },
  },
  pages: {
    settings_page: {
      SaveOnClick: (e: MouseEvent) => {
        e.preventDefault();

        const audioFolder = App.inputManager.get("audio-folder");
        const videoFolder = App.inputManager.get("video-folder");
        // verify inputs fields
        if ((audioFolder && videoFolder === "") || /^/)
          return alert("Wait! fill in the first fields");

        // set audio & video path
        App.storage.set("audio-path", JSON.stringify({ path: audioFolder }));
        App.storage.set("video-path", JSON.stringify({ path: videoFolder }));

        // set modified
        App.storage.set("modified-audio-path", "true");

        // reset input
        App.inputManager.reset("audio-folder");
        App.inputManager.reset("video-folder");
      },
      DiscardOnClick: (e: MouseEvent) => {
        e.preventDefault();
        // reset input
        App.inputManager.reset("audio-folder");
        App.inputManager.reset("video-folder");
      },
    },
    download_page: {
      DropdownToggler: (e: MouseEvent, dropdown: Element) => {
        e.preventDefault();

        if (dropdown.classList.contains("active")) {
          dropdown.classList.remove("active");
        } else {
          dropdown.classList.add("active");
        }
      },
      StartDownload: (e: MouseEvent) => {
        e.preventDefault();
        const url = App.inputManager.get("selector-for-format").toString();
        console.log(url);
        if (url === "") return alert("Please, provide a url");

        let NOTIFICATION_TITLE = "Download Started";
        let NOTIFICATION_BODY = "";

        // get audio and video path
        const audioPath = JSON.parse(App.storage.get("audio-path")).path;
        const videoPath = JSON.parse(App.storage.get("video-path")).path;
        const download_type = App.storage.get("downtype").toString();

        switch(download_type) {
          case "audio":
            window.musicService.onDownloadClick(url, audioPath);
            window.musicService.on("OnDownloadAudioEnd", (str: string) => {
              console.log(str);
              NOTIFICATION_BODY = str;
              new Notification('Download Terminated', { body: NOTIFICATION_BODY });
            })
          break
        }
      },
    },
  },
  init: () => {
    const windowStyles = window.windowStyles;

    // workspace templateHtml
    //#region
    const HTMLTemplate = `
  <div class="workspace">
  <div class="menu-bar">
    <div class="menu-bar items">
      <div class="top-menu">
        <a role="button" id="page-main">
          <i class="bi bi-house"></i>
        </a>
        <a role="button" id="page-files">
          <i class="bi bi-download"></i>
        </a>
        <a role="button" id="page-settings">
          <i class="bi bi-gear"></i>
        </a>
      </div>
    </div>
  </div>
  <div id="page-renders">
  </div>
  </div>
  `;
    //#endregion

    // Home template
    //#region
    const HTMLHomeTemplate = `
  <div class="home">
  <h2 class="app-title">Home</h2>
  <div class="home app-details">
    <span id="app-version">App Version: ${window.AppVersion}</span>
    <span id="app-base-audio-dir">app-base-audio-dir: ${
      JSON.parse(App.storage.get("audio-path")).path
    }</span>
    <span id="app-base-video-dir">app-base-video-dir: ${
      JSON.parse(App.storage.get("video-path")).path
    }</span>
  </div>
</div>
  `;
    //#endregion

    // configPage template
    //#region
    const HTMLConfigTemplate = `
  <div class="config">
  <h2 class="app-title">Settings</h2>
  <div class="config config-workspace">
    <div class="input-group">
      <span>Directories Config</span>
      <label for="audio-folder">Music Folder</label>
      <input type="text" id="audio-folder" placeholder=${
        JSON.parse(App.storage.get("audio-path")).path
      }>
      <label for="video-folder">Videos Folder</label>
      <input type="text" id="video-folder" placeholder=${
        JSON.parse(App.storage.get("video-path")).path
      }>
    </div>
    <div class="button-group">
      <button id="button-config-save">Save</button>
      <button id="button-config-discard">Discard</button>
    </div>
  </div>
</div>
  `;

    //#endregion

    const HTMLDownloadTemplate = `
    <div class="workspace">
    <h2>Download</h2>
    <div class="workspace workspace-main">
      <label for="selector-for-format">YouTube Video Url</label>
      <div class="input-group">
        <input id="selector-for-format" placeholder="url" type="url"/>
        <a role="button" id="toggle-dropdown">
          <i class="bi bi-caret-down"></i>
        </a>
      </div>
      <div class="dropdown" id="dropdown-menu">
        <ul>
          formatos
          <li>
            <a id="selected-video"
              ><i class="bi bi-file-earmark-play-fill"></i> video</a
            >
          </li>
          <li>
            <a id="selected-audio"
              ><i class="bi bi-file-earmark-music-fill"></i> audio</a
            >
          </li>
        </ul>
      </div>
      <div class="button-group">
        <button id="start-download"><i class="bi bi-download"></i> download</button>
      </div>
    </div>
  </div>
    `;

    // render pages
    window.onload = async function () {
      await App.loadStyles(windowStyles);
      await App.loadElements(HTMLTemplate);

      // root
      const pageRenders = document.getElementById("page-renders");
      // app root set initial page/tab
      App.storage.set("tab", "page-main");

      // render initial page/tab
      pageRenders.innerHTML = HTMLHomeTemplate;

      document
        .getElementById("page-main")
        .addEventListener("click", (e: MouseEvent) => {
          e.preventDefault();
          App.storage.set("tab", "page-main");
          if (App.storage.get("tab").toString() != "page-main") {
            pageRenders.innerHTML = "";
          } else {
            pageRenders.innerHTML = HTMLHomeTemplate;
          }
        });

      document
        .getElementById("page-files")
        .addEventListener("click", (e: MouseEvent) => {
          e.preventDefault();
          App.storage.set("tab", "page-files");
          if (App.storage.get("tab").toString() != "page-files") {
            pageRenders.innerHTML = "";
          } else {
            pageRenders.innerHTML = HTMLDownloadTemplate;
            const dropdownToggler = document.getElementById("toggle-dropdown");
            const dropdown = document.querySelector(".dropdown");
            dropdownToggler.addEventListener("click", (e: MouseEvent) => {
              App.pages.download_page.DropdownToggler(e, dropdown);
            });

            document
              .getElementById("selected-video")
              .addEventListener("click", (e: MouseEvent) => {
                e.preventDefault();
                App.storage.set("downtype", "video");
              });

            document
              .getElementById("selected-audio")
              .addEventListener("click", (e: MouseEvent) => {
                e.preventDefault();
                App.storage.set("downtype", "audio");
              });

            const buttonDownload = document.getElementById('start-download');
            if (buttonDownload) {
              buttonDownload.addEventListener('click', (e: MouseEvent) => {
                App.pages.download_page.StartDownload(e);
              })
            }
          }
        });

      document
        .getElementById("page-settings")
        .addEventListener("click", (ev: MouseEvent) => {
          ev.preventDefault();
          App.storage.set("tab", "page-settings");
          if (App.storage.get("tab").toString() != "page-settings") {
            pageRenders.innerHTML = "";
          } else {
            pageRenders.innerHTML = HTMLConfigTemplate;
            document
              .getElementById("button-config-save")
              .addEventListener("click", (e: MouseEvent) => {
                App.pages.settings_page.SaveOnClick(e);
              });
            document
              .getElementById("button-config-discard")
              .addEventListener("click", (e: MouseEvent) => {
                App.pages.settings_page.DiscardOnClick(e);
              });
          }
        });
    };
  },

  run: async () => {
    App.storage.set("modified-audio-path", "false");
    App.storage.set("downtype", "audio");

    if (App.storage.get("modified-audio-path").toString() === "false") {
      App.loadDefaultDirectories();
      App.init();
    } else {
      App.init();
    }
  },
};

App.run();
