//----------------------------------//
// Main window events and functions //
//----------------------------------//


// Button events //
document.getElementById("new-timer").addEventListener("click", async () => {
    const response = await window.mainWindow.createNewWindow("new-timer");
    console.log(response);
})

document.getElementById("new-timer-and-splits").addEventListener("click", async () => {
    const response = await window.mainWindow.createNewWindow("new-timer-and-splits");
    console.log(response);
})