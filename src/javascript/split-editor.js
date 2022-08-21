//------------------------------------------//
// Split Editor window events and functions //
//------------------------------------------//

"use strict";

// Track data of the window //
let splitEditorWindowData = {
    currentUIView: "splits",
    selectedSplit: null,
    splitCount: 0,
    splitColors: {
        selected: "rgb(160,160,160)",
        notSelected: "rgb(240,240,240)",
    },
    splits: [],

}

// Make splits button's color active when content is loaded
document.addEventListener("DOMContentLoaded", () => {
    
})


// Top bar buttons //
document.getElementById("splits-button").addEventListener("click", () => {
    // Swap visible views
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

// Function for disabling / enabling split modifier buttons
const disableSplitModifierButtons = (result) => {
    document.getElementById("remove-split").disabled = result;
    document.getElementById("rename-split").disabled = result;
    document.getElementById("deselect-split").disabled = result;
    //document.getElementById("move-up").disabled = result;
    //document.getElementById("move-down").disabled = result;
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

    // when a split is selected
    createdSplit.addEventListener("click", () => {
        if (splitEditorWindowData.selectedSplit) {
            splitEditorWindowData.selectedSplit.style["background-color"] = splitEditorWindowData.splitColors.notSelected;
        }

        splitEditorWindowData.selectedSplit = createdSplit;
        createdSplit.style["background-color"] = splitEditorWindowData.splitColors.selected;

        // Enable disabled buttons
        disableSplitModifierButtons(false);
    });
}

const removeSplit = () => {
    if (splitEditorWindowData.selectedSplit) {
        // Remove split element from the window
        splitEditorWindowData.selectedSplit.parentElement.remove();   // Remove the parent paragraph element which holds the split button
        splitEditorWindowData.selectedSplit = null;
        splitEditorWindowData.splitCount--;

        // Disable enabled buttons
        disableSplitModifierButtons(true);
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

            // Deselect split
            splitEditorWindowData.selectedSplit.style["background-color"] = splitEditorWindowData.splitColors.notSelected;
            splitEditorWindowData.selectedSplit = null;

            // Disable enabled buttons
            disableSplitModifierButtons(true);
        }
    }
}

const deselectSplit = () => {
    // Deselect DOM split element
    if (splitEditorWindowData.selectedSplit) {
        splitEditorWindowData.selectedSplit.style["background-color"] = splitEditorWindowData.splitColors.notSelected;
        splitEditorWindowData.selectedSplit = null;

        // Disable enabled buttons
        disableSplitModifierButtons(true);
    }
}

const moveSplitUp = () => {
    // Move DOM split element up
    /*
    if (splitEditorWindowData.selectedSplit && splitEditorWindowData.splitCount > 1) {
        const splitElem = splitEditorWindowData.selectedSplit;
        const orderIndex = parseInt(splitElem.value);
        const selectedSplitText = splitElem.innerText;

        // If split is not the first split
        if (orderIndex > 0) {
            const previousSplit = splitEditorWindowData.splits[orderIndex - 1];

            // Swap splits in split array
            splitEditorWindowData.splits.splice((orderIndex - 1), 2, splitElem, previousSplit);
            console.log(splitEditorWindowData.splits);

            // Swap element texts
            splitElem.innerText = previousSplit.innerText;
            previousSplit.innerText = selectedSplitText;

            // Change selected split to the new one
            splitEditorWindowData.selectedSplit = previousSplit;
            splitEditorWindowData.selectedSplit.style["background-color"] = splitEditorWindowData.splitColors.selected;
            splitElem.style["background-color"] = splitEditorWindowData.splitColors.notSelected;
        }
    }
    */
}

const moveSplitDown = () => {
    // Move DOM split element down
    if (splitEditorWindowData.selectedSplit) {
        const selectedSplitText = splitEditorWindowData.selectedSplit.innerText;
        
    }
}

const selectAllSplits = () => {
    // Select all DOM split elements
    
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

// Deselect split
document.getElementById("deselect-split").addEventListener("click", deselectSplit)

// Move split up
document.getElementById("move-up").addEventListener("click", moveSplitUp)

// Move split down
document.getElementById("move-down").addEventListener("click", moveSplitDown)

// Select all splits
document.getElementById("select-all").addEventListener("click", selectAllSplits)



//----------------//
// Customize view //
//----------------//

// Button events




//-----------------------//
// OK and Cancel buttons //
//-----------------------//

document.getElementById("ok-button").addEventListener("click", () => {
    // Read window data
    let activityName = document.getElementById("activity-name").value;
    if (activityName === "") activityName = "Untitled";
    const categoryName = document.getElementById("category-name").value;
    let splitNames = [];

    // Get all split elements as array
    const splitElements = Object.values(document.querySelector(".list-of-splits").children);
    
    // Get the names of each split
    if (splitElements.length > 0) {
        for (let i = 0; i < splitElements.length; i++) {
            splitNames[i] = splitElements[i].firstChild.innerText;
        }
    }

    console.log(splitNames);

    // Create an object of data to pass to the main process
    let windowDataToPass = {
        activity: "Untitled",
        category: "",
        splits: splitNames,
        customization: {
            activityColor: document.getElementById("activity-name-color").value,
            categoryColor: document.getElementById("category-name-color").value,
            splitTextColor: document.getElementById("split-text-color").value,
            splitTimeColor: document.getElementById("split-time-color").value,

            splitIndicatorColor: document.getElementById("split-indicator-color").value,
            splitTimeSaveColor: document.getElementById("split-time-save-color").value,
            splitTimeLostColor: document.getElementById("split-time-lost-color").value,
            timerColor: document.getElementById("timer-color").value,
            personalBestTimeColor: document.getElementById("personal-best-time-color").value,
        }
    };

    if (typeof activityName === "string") windowDataToPass.activity = activityName;
    if (typeof categoryName === "string") windowDataToPass.category = categoryName;

    // Create new timer and splits window
    window.windowCreator.createNewWindow("new-timer-and-splits", windowDataToPass);


    // close window
    window.close();
})

document.getElementById("cancel-button").addEventListener("click", () => {
    // Cancel editing, discard changes and close window
    window.close();
})