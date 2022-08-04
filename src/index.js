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

    // the real main window 
    const mainWindowReal = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, "preload.js"),
            sandbox: true,
        }
    });

    /*
    // window for split editor
    const splitEditorWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, "preload.js"),
            sandbox: true,
        }
    });

    // window for layout editor
    const layoutEditorWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, "preload.js"),
            sandbox: true,
        }
    });
    */

    // Set window titles
    mainWindow.setTitle("Timer Project");
    mainWindowReal.setTitle("Timer Project");
    // splitEditorWindow.setTitle("Split Editor");
    //layoutEditorWindow.setTitle("Layout Editor");

    // Edit topbar menus
    

    // Set background color
    mainWindow.setBackgroundColor("rgb(255, 255, 255)");

    // Set window properties
    

    // Load the window contents
    mainWindow.loadFile(path.join(__dirname, "index.html"));
    mainWindowReal.loadFile(path.join(__dirname, "html", "main-window.html"));
    // splitEditorWindow.loadFile(path.join(__dirname, "html", "split-editor.html"));
    // layoutEditorWindow.loadFile(path.join(__dirname, "html", "layout-editor.html"));

    // (Development mode) open DevTools
    mainWindowReal.webContents.openDevTools(); 

    // return the created windows
    return { mainWindow, mainWindowReal };
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
        // Start/pause timer
        appWindows.mainWindow.webContents.send("timer-shortcut", "start/pause");
    })

    globalShortcut.register("Alt+R", () => {
        // Reset timer
        appWindows.mainWindow.webContents.send("timer-shortcut", "reset");
    })

    // Do checks if necessary
    console.log("Node version:", process.versions["node"]);
    console.log("Chrome version:", process.versions["chrome"]);
    console.log("Electron version:", process.versions["electron"]);
}

// Wait for app module's ready event to initialize the app
app.whenReady().then(initApp);

