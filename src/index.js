//------------------------------//
// Main process of electron app //
//------------------------------//

// Get modules
const { app, BrowserWindow, webContents } = require("electron");
const path = require("path");

// Function for creating a window
const createWindow = function() {
    const mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            // preload script
            preload: path.join(__dirname, "preload.js")
        }
    });

    // Load the window content
    mainWindow.loadFile(path.join(__dirname, "index.html"));
}

// Wait for app module's ready event to create a window
app.whenReady().then(function() {
    createWindow();

    // (macOS) If no windows are open, then create one
    app.on("activate", function() {
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    })
})

// Close the app when all windows are closed (When not on macOS)
app.on("window-all-closed", function() {
    if (process.platform !== "darwin") {        // darwin = macOS
        console.log("Closing all windows...");
        console.log("Quitting app...");
        app.quit();
    }
})

