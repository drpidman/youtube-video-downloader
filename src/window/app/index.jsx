import React, { Component } from "react";


import { DownloadView } from "../components/Pages/download";
import { MainView } from "../components/Pages/main";
import { MainContent } from "../components/view/Main.content";
import { SideBar, SideBarItems } from "../components/view/SideBar";

const app = window.require('electron').remote.app;

//disable Javascript Validate in user preferences, vscode;

interface Props {}
interface State {
  page: string;
  loading: boolean;
}

// typings for typescript files
export default class Main extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      page: "main",
      loading: true
    };
  }

  componentDidMount() {
    this.loading();
    this.initDefaultDir();
  }


  initDefaultDir = () => {

    localStorage.setItem('audio-path', JSON.stringify({
      path: app.getPath('music'),
      modified: false
    }));

    localStorage.setItem('video-path', JSON.stringify({
      path: app.getPath('videos'),
      modified: false
    }));

  }

  // MouseEvents
  /** @type {MouseEvent} */
  switchToMain = async (e: MouseEvent) => {
    this.setState({ page: "main" });
  };

  switchToFiles = (e: MouseEvent) => {
    e.preventDefault();
    this.setState({ page: "files" });
  };

  switchToSettings = (e: MouseEvent) => {
    e.preventDefault();
    this.setState({ page: "settings " });
  };

  loading = () => {
    // timer to set directories
    setTimeout(() => this.setState({ loading: false }), 1000)
  }

  
  renderByState = () => {
    switch(this.state.page) {
      case "main":
        return <MainView/>
      break
      case "files":
        return <DownloadView/>
      break
    }
  }

  mainContent = () => {
    return (
      <div>
        <SideBar>
          <SideBarItems>
            <a role="button" onClick={this.switchToMain}>
              <i className="bi bi-house"></i>
            </a>
            <a role="button" onClick={this.switchToFiles}>
              <i className="bi bi-download"></i>
            </a>
            <a role="button" onClick={this.switchToSettings}>
              <i className="bi bi-gear"></i>
            </a>
          </SideBarItems>
        </SideBar>
        <MainContent>
          {
            this.renderByState()
          }
        </MainContent>
      </div>
    );
  };

  render() {
    // RETURN BY
    if (this.state.loading)
        return null;
    else
        return this.mainContent();
  }
}
