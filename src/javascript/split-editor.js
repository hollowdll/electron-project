//------------------------------------------//
// Split Editor window events and functions //
//------------------------------------------//

// Track data of the window //
let splitEditorWindowData = {
    currentUIView: "splits",
    selectedSplit: null,
    splitCount: 0,
    splitColors: {
        selected: "rgb(160,160,160)",
        notSelected: "rgb(240,240,240)",
    }

}

// Make splits button's color active when content is loaded
document.addEventListener("DOMContentLoaded", () => {
    
})


// Top bar buttons //
document.getElementById("splits-button").addEventListener("click", () => {
    document.querySelector(".customize").style.display = "none";
    document.querySelector(".splits").style.display = "block";
})

document.getElementById("customize-button").addEventListener("click", () => {
    document.querySelector(".splits").style.display = "none";
    document.querySelector(".customize").style.display = "block";
})


//-------------//
// Splits view //
//-------------//

// Function that prevents reloading the window when forms are submitted
const preventWindowReload = (event) => {
    event.preventDefault();
}

// Function for creating a new split DOM element
const addSplit = () => {
    // Create a new split element
    const splitHolder = document.createElement('p');
    let createdSplit = document.createElement("button");
    const splitName = document.getElementById("split-name").value;
    if (splitName === "") {
        createdSplit.innerText = "Untitled";
    } else {
        createdSplit.innerText = splitName;
    }
    splitHolder.appendChild(createdSplit);
    document.querySelector(".list-of-splits").appendChild(splitHolder);

    // Increase splitCount by 1
    splitEditorWindowData.splitCount++;
    createdSplit.innerText = `${splitEditorWindowData.splitCount}. ${createdSplit.innerText}`;

    // when a split is selected
    createdSplit.addEventListener("click", () => {
        if (splitEditorWindowData.selectedSplit) {
            splitEditorWindowData.selectedSplit.style["background-color"] = splitEditorWindowData.splitColors.notSelected;
        }

        splitEditorWindowData.selectedSplit = createdSplit;
        createdSplit.style["background-color"] = splitEditorWindowData.splitColors.selected;

        // Enable disabled buttons
        document.getElementById("remove-split").disabled = false;
        document.getElementById("rename-split").disabled = false;
        document.getElementById("move-split").disabled = false;
    });
}

const removeSplit = () => {
    // Remove DOM split element
    if (splitEditorWindowData.selectedSplit) {
        splitEditorWindowData.selectedSplit.remove();
        splitEditorWindowData.selectedSplit = null;
        splitEditorWindowData.splitCount--;

        // Disable enabled buttons
        document.getElementById("remove-split").disabled = true;
        document.getElementById("rename-split").disabled = true;
        document.getElementById("move-split").disabled = true;
    }
}

const renameSplit = () => {
    // Rename DOM split element
    if (splitEditorWindowData.selectedSplit) {
        const splitName = document.getElementById("split-name").value;

        if (splitName === "") {
            return
        } else {
            splitEditorWindowData.selectedSplit.innerText = splitName;
            splitEditorWindowData.selectedSplit.style["background-color"] = splitEditorWindowData.splitColors.notSelected;

            // Disable enabled buttons
            document.getElementById("remove-split").disabled = true;
            document.getElementById("rename-split").disabled = true;
            document.getElementById("move-split").disabled = true;
        }
    }
}

const moveSplit = () => {
    // Move DOM split element

}


// input events //

// Activity name input
document.getElementById("activity-form").addEventListener("submit", preventWindowReload)

// Category name input
document.getElementById("category-form").addEventListener("submit", preventWindowReload)

// Split name input
document.getElementById("split-form").addEventListener("submit", preventWindowReload)

// New split
document.getElementById("add-split").addEventListener("click", addSplit)

// Remove split
document.getElementById("remove-split").addEventListener("click", removeSplit)

// Rename split
document.getElementById("rename-split").addEventListener("click", renameSplit)

// Move split
document.getElementById("move-split").addEventListener("click", moveSplit)



//----------------//
// Customize view //
//----------------//

// Button events




//-----------------------//
// OK and Cancel buttons //
//-----------------------//

document.getElementById("ok-button").addEventListener("click", () => {
    // Create new timer and splits window

})

document.getElementById("cancel-button").addEventListener("click", () => {
    // Cancel editing, discard changes and close window
    window.close();
})