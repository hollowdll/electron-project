//---------------------------------------------------//
// Interaction with web contents in renderer process //
//---------------------------------------------------//

// This file is the main javascript file of renderer process //
// All renderer process programs start here //


// Handle IPC messages from the main process
window.keyboardShortcuts.handleLogs((event, value) => {
    console.log(value);
})

// Initialize timer program //
const timer = new Timer();
