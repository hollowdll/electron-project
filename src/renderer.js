//---------------------------------------------------//
// Interaction with web contents in renderer process //
//---------------------------------------------------//


// Test IPC by sending a message to the main process
const testMessage = async function() {
    const response = await window.versions.sendMessageToMainProcess();
    console.log(response);
}

testMessage();

