//----------------------------------------------------//
// This script runs before rendered process is loaded //
//--------------------------------------------------- //

// Can access DOM APIs + node.js
// Main process cannot access DOM APIs like window and document
// so we need to attach this script to the renderer process to use them

// Read more about preload.js file:
// https://www.electronjs.org/docs/latest/tutorial/tutorial-preload


const { contextBridge, ipcRenderer } = require("electron");

// Expose dark mode API to renderer's window object
contextBridge.exposeInMainWorld("darkMode", {
    toggle: () => ipcRenderer.invoke("dark-mode:toggle"),
    system: () => ipcRenderer.invoke("dark-mode:system"),
})

// Expose keyboard shortcut API to the renderer process
contextBridge.exposeInMainWorld("keyboardShortcuts", {
    // These are event listeners in the renderer process
    onTimerShortcut: (callback) => ipcRenderer.on("timer-shortcut", callback),
})

// Window creating API
contextBridge.exposeInMainWorld("windowCreator", {
    createNewWindow: (message, data) => ipcRenderer.invoke("create-new-window", message, data),
    onWindowCreated: (callback) => ipcRenderer.on("new-window-created", callback),
    
})

