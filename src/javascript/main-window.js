//----------------------------------//
// Main window events and functions //
//----------------------------------//

"use strict";

// Button events //
document.getElementById("new-timer").addEventListener("click", async () => {
    const response = await window.windowCreator.createNewWindow("new-timer");
    console.log(response);
})

document.getElementById("new-timer-and-splits").addEventListener("click", async () => {
    const response = await window.windowCreator.createNewWindow("new-split-editor");
    console.log(response);
})

document.getElementById("open-timer").addEventListener("click", async () => {
    
})