"use strict";
const electron = require("electron");
electron.contextBridge.exposeInMainWorld("api", {
  ping: () => electron.ipcRenderer.invoke("ping")
});
