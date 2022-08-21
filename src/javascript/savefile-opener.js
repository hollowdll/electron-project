//------------------------//
// Savefile opener window //
//------------------------//


// Load savefile names and create buttons for them
window.appFileSystem.loadSavefileData((event, savefileData) => {
    const savefileNames = Object.keys(savefileData);

    // If at least 1 savefile
    if (savefileNames.length > 0) {
        const savefileMenu = document.querySelector(".menu");
        const templateSavefile = document.getElementById("template-savefile");

        // Create button for each savefile
        for (const name of savefileNames) {
            const savefileElem = templateSavefile.cloneNode(true);
            const savefileElemChildren = Object.values(savefileElem.children);
            savefileElem.style.display = "block";

            // Assign the file name
            for (const child of savefileElemChildren) {
                if (child.id === "name") {
                    child.innerText = `${savefileData[name].activity} ${savefileData[name].category}`;

                    // Open the right window when clicked
                    child.addEventListener("click", () => {
                        window.appFileSystem.createWindowFromSavefile("timer-and-splits", savefileData[name]);
                    })
                }
            }

            savefileMenu.appendChild(savefileElem);
        }

        // Delete the template savefile
        templateSavefile.remove();
    }
})