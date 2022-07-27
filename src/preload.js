//----------------------------------------------------//
// This script runs before rendered process is loaded //
//--------------------------------------------------- //

// Can access DOM APIs + node.js
// Main process cannot access DOM APIs like window and document
// so we need to attach this script to the renderer process to use them

// Read more about preload.js file:
// https://www.electronjs.org/docs/latest/tutorial/tutorial-preload


const { contextBridge, ipcRenderer } = require("electron");

// Expose globals to the renderer process
contextBridge.exposeInMainWorld("versions", {
    node: () => process.versions.node,
    chrome: () => process.versions.chrome,
    electron: () => process.versions.electron,
    sendMessageToMainProcess: () => ipcRenderer.invoke("IPC-test"),
    // it is possible to expose variables too
})

