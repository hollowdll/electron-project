//---------------------------------------------------//
// Interaction with web contents in renderer process //
//---------------------------------------------------//

// This file is the main javascript file of renderer process //
// All renderer process programs start here //


// Initialize timer program //
const timer = new Timer();


// Handle IPC messages from the main process //

// Keyboard shortcut events //

// Timer shortcuts
window.keyboardShortcuts.onTimerShortcut((event, value) => {
    // Check which timer event is supposed to happen
    if (value === "start/pause") {
        // If timer is running
        if (timer.isRunning) {
            timer.pause();
        } else {
            timer.start();
        }
    }
    else if(value === "reset") {
        timer.reset();
    }
})

