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

// Expose keyboard shortcut API
contextBridge.exposeInMainWorld("keyboardShortcuts", {
    handleLogs: (callback) => ipcRenderer.on("log-message", callback),
    
})
