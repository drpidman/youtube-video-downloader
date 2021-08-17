export const styles = `
* {
  margin: 0;
  padding: 0;
}

html,
body {
  margin: 0;
  padding: 0;
  min-height: auto;
  overflow: hidden;
}

body {
  height: auto;
  width: 100%;
  overflow: hidden;
  background-color: #1d1d1d;
}

.menu-bar {
  background-color: #3b79ff;
  width: 9%;
  height: 100vh;
  display: flex;
  justify-content: center;
  position: fixed;
  color: white;
  border-bottom-right-radius: 5px;
  border-top-right-radius: 5px;
}

.menu-bar.items {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  width: auto;
  height: auto;
}

.menu-bar.items .top-menu {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 15.5rem;
  justify-content: flex-start;
  padding: 0rem;
  padding-top: 0.3rem;
}

.menu-bar.items .top-menu a {
  margin: 5px;
  width: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
  border-radius: 0.5rem;
  transition: all 100ms ease ease-in-out;
}

.menu-bar.items .top-menu a:hover {
  transition: 100ms;
  background-color: #6797ff;
}

#page-renders {
  width: auto;
  height: auto;
  margin-left: 9%;
  padding: 20px;
  color: white;
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
}

#page-renders .home {
  width: 100%;
  background-color: #353535;
  height: auto;
  border-radius: 5px;
  padding-left: 7px;
  padding-right: 7px;
  overflow: auto;
}

#page-renders .home .app-title {
  padding-top: 5px;
  margin: 0.5rem;
  font-weight: bold;
  font-family: "Arial" sans-serif;
  color: white;
}

#page-renders .home.app-details {
  display: flex;
  width: auto;
  margin: 10px;
  padding: 10px;
  background-color: #272626;
  height: 100px;
  overflow: auto;
  flex-direction: column;
  transition: all 200ms ease-in-out;
}

#page-renders .home.app-details:hover {
  transition: 200ms;
  background-color: #222222;
}

#page-renders .home.app-details span,
h1,
h2 {
  color: darkgray;
  margin: 3px;
}

#page-renders .config {
  width: 100%;
  background-color: #353535;
  height: auto;
  border-radius: 5px;
  padding-left: 7px;
  padding-right: 7px;
  overflow: auto;
}

#page-renders .config .app-title span,
h1,
h2 {
  color: white;
  font-family: "Arial" sans-serif;
  margin: 5px;
}

#page-renders .config.config-workspace {
  display: flex;
  width: auto;
  margin: 10px;
  padding: 10px;
  background-color: #303030;
  height: auto;
  flex-direction: column;
  transition: all 200ms ease-in-out;
}

#page-renders .config.config-workspace .input-group {
  width: 100%;
  height: 100%;
  flex-direction: column;
  display: flex;
  background-color: transparent;
  position: relative;
  overflow: auto;
}

#page-renders .config.config-workspace .input-group span {
  color: darkgray;
  margin: 10px;
}

#page-renders .config.config-workspace .input-group input {
  width: 40%;
  margin: 10px;
  padding: 0.5rem;
  background-color: transparent;
  color: white;
  border: none;
  outline: none;

  border-bottom-style: solid;
  border-bottom-color: #3b79ff;
  border-bottom-width: 1px;

  font-family: Arial, Helvetica, sans-serif;
  transition: all 200ms ease-in-out;
}

#page-renders .config.config-workspace .input-group input:focus {
  transition: 200ms;
  background-color: #353535;
}

#page-renders .config.config-workspace .input-group input:hover {
  transition: 200ms;
  background-color: #353535;
}

#page-renders .config.config-workspace .button-group {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
  height: 50px;
  background-color: transparent;
  align-items: center;
}

#page-renders .config.config-workspace .button-group button {
  padding: 0.5rem;
  margin: 0.3rem;
  width: 20%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 16px;
  outline: none;
  border: none;

  border-radius: 5px;
  background-color: #6797ff;
  color: white;

  transition: all 200ms ease-in-out;
}

#page-renders .config.config-workspace .button-group button:hover {
  transition: 200ms;
  background-color: #3b79ff;
}

#page-renders .workspace {
  width: 100%;
  background-color: #353535;
  height: auto;
  border-radius: 5px;
  padding-left: 7px;
  padding-right: 7px;
  overflow: auto;
}

#page-renders .workspace .app-title span,
h1,
h2 {
  color: white;
  font-family: Arial, Helvetica, sans-serif;
}

#page-renders .workspace.workspace-main {
  display: flex;
  width: auto;
  margin: 10px;
  padding: 10px;
  background-color: #303030;
  height: auto;
  flex-direction: column;
  transition: all 200ms ease-in-out;
}

#page-renders .workspace.workspace-main .input-group {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  margin: 1px;
}

#page-renders .workspace.workspace-main .input-group input {
  width: 40%;
  margin: 25px;
  padding: 0.5rem;
  background-color: transparent;
  color: white;
  border: none;
  outline: none;

  border-bottom-style: solid;
  border-bottom-color: #3b79ff;
  border-bottom-width: 1px;

  font-family: Arial, Helvetica, sans-serif;
  transition: all 200ms ease-in-out;
}

#page-renders .workspace.workspace-main .input-group a {
  margin: 5px;
  padding: 10px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: all 200ms ease-in-out;
  border-radius: 10px;
}

#page-renders .workspace.workspace-main .input-group a:hover {
  transition: 200ms;
  background-color: #444444;
}

#page-renders .workspace.workspace-main .dropdown {
  width: 20%;
  height: auto;
  align-items: center;
  position: absolute;
  right: 22.1rem;
  top: 7.5rem;
  background-color: #fff;
  display: none;
  border-radius: 10px;
  border-top-right-radius: 0;
  transition: all 200ms ease-in-out;
}

#page-renders .workspace.workspace-main .dropdown.active {
  display: inline;
}

#page-renders .workspace.workspace-main .dropdown ul {
  padding: 6.6px;
  text-align: center;
  color: #444;
}

#page-renders .workspace.workspace-main .dropdown ul li {
  list-style: none;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  margin: 5px;
  padding: 5px;
  background-color: #3b79ff;
  border-radius: 5px;
  transition: all 200ms ease-in-out;
}

#page-renders .workspace.workspace-main .dropdown ul li:hover {
  transition: 200ms;
  background-color: #6797ff;
}

#page-renders .workspace.workspace-main .button-group {
  display: flex;
  flex-direction: row;
}

#page-renders .workspace.workspace-main .button-group button {
  padding: 0.5rem;
  margin: 0.3rem;
  width: 20%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 16px;
  outline: none;
  border: none;
  border-radius: 5px;
  background-color: #6797ff;
  color: white;
  transition: all 200ms ease-in-out;
}


#page-renders .workspace.workspace-main .button-group button i {
  margin-right: 0.4rem;
}

#page-renders .workspace.workspace-main .button-group button:hover {
  transition: 200ms;
  background-color: #3b79ff;
}

label {
  color: darkgray;
  margin-left: 6px;
}

`;
