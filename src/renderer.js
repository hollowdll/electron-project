//---------------------------------------------------//
// Interaction with web contents in renderer process //
//---------------------------------------------------//

// This file is the main javascript file of the renderer process //

"use strict";

// Handle IPC messages from the main process //

// Keyboard shortcut events //

// Timer shortcuts
/*
window.keyboardShortcuts.onGlobalKeyboardShortcut((event, value) => {
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
*/
