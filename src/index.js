//------------------------------//
// Main process of electron app //
//------------------------------//

// Get modules
const { app, BrowserWindow, ipcMain, globalShortcut, nativeTheme } = require("electron");
const path = require("path");

// Function for creating app windows
const createWindows = () => {
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

    // Set background color
    mainWindow.setBackgroundColor("rgb(255, 255, 255)");

    // Load the window contents
    mainWindow.loadFile(path.join(__dirname, "index.html"));

    return { mainWindow };
}

// Function for handling IPC messages from the renderer process
const handleIpcMessages = () => {
    // Dark mode
    ipcMain.handle("dark-mode:toggle", () => {
        if (nativeTheme.shouldUseDarkColors) {
            nativeTheme.themeSource = 'light';
        } else {
            nativeTheme.themeSource = 'dark';
        }
        return nativeTheme.shouldUseDarkColors;
    });

    ipcMain.handle("dark-mode:system", () => {
        nativeTheme.themeSource = "system";
    });


}

// Function to be executed after app's ready event
const initApp = () => {
    // Handle IPC messages from the renderer process
    handleIpcMessages();

    // Create app windows
    const appWindows = createWindows();

    // (macOS) If no windows are open, then create one
    app.on("activate", () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindows();
    })

    // Close the app when all windows are closed (When not on macOS)
    app.on("window-all-closed", () => {
        if (process.platform !== "darwin") {        // darwin = macOS
            console.log("Closing all windows...");
            console.log("Quitting app...");
            app.quit();
        }
    })

    // Register global keyboard shortcuts
    globalShortcut.register("Alt+K", () => {
        console.log("Global keyboard shortcut!");
        appWindows.mainWindow.webContents.send("log-message", "Message from the main process!");
    })

    // Do checks if necessary
    console.log("Node version:", process.versions["node"]);
    console.log("Chrome version:", process.versions["chrome"]);
    console.log("Electron version:", process.versions["electron"]);
}

// Wait for app module's ready event to initialize the app
app.whenReady().then(initApp);

