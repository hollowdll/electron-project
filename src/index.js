//------------------------------//
// Main process of electron app //
//------------------------------//

// Get modules
const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");

// Function for creating app windows
const createWindows = function() {
    // main window
    const mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            // preload script
            preload: path.join(__dirname, "preload.js"),
            // Enable sandboxing for the renderer. Read: https://www.electronjs.org/docs/latest/tutorial/sandbox
            sandbox: true,
        }
    });

    // Handle messages sent from the renderer process
    ipcMain.handle("IPC-test", () => `Message received from channel "IPC-test"`);

    // Load the window contents
    mainWindow.loadFile(path.join(__dirname, "index.html"));

    
}

// Wait for app module's ready event to create a window
app.whenReady().then(function() {
    createWindows();

    // (macOS) If no windows are open, then create one
    app.on("activate", function() {
        if (BrowserWindow.getAllWindows().length === 0) createWindows();
    })

    // Do checks if necessary
    console.log("Node version:", process.versions["node"]);
    console.log("Chrome version:", process.versions["chrome"]);
    console.log("Electron version:", process.versions["electron"]);
})

// Close the app when all windows are closed (When not on macOS)
app.on("window-all-closed", function() {
    if (process.platform !== "darwin") {        // darwin = macOS
        console.log("Closing all windows...");
        console.log("Quitting app...");
        app.quit();
    }
})

