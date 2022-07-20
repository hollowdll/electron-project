// Javascript entry point //
// Main process //

// Get modules to create the app
const { app, BrowserWindow } = require("electron");

// Create a window
const createWindow = function() {
    const win = new BrowserWindow({ width: 800, height: 600 });

    win.loadFile("index.html");
}

