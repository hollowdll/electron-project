// This script runs before rendered process is loaded
// Can access window and document globals + node.js

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