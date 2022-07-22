//----------------------------------------------------//
// This script runs before rendered process is loaded //
// Can access window and document globals + node.js //
//--------------------------------------------------//

// Main process cannot access window and document globals
// so we need to attach this script to renderer process to use them
// This is attached to BrowserWindow constructor in index.js

window.addEventListener("DOMContentLoaded", function() {
    const replaceText = function(selector, text) {
        const element = document.getElementById(selector);
        if (element) {
            element.innerText = text;
        }
    }

    for (const dependency of ["chrome", "node", "electron"]) {
        replaceText(`${dependency}-version`, process.versions[dependency])
    }
})