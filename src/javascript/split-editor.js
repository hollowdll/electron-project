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
    },
    splits: [],

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

// Function for disabling / enabling split modifier buttons
const disableSplitModifierButtons = (result) => {
    document.getElementById("remove-split").disabled = result;
    document.getElementById("rename-split").disabled = result;
    document.getElementById("deselect-split").disabled = result;
    document.getElementById("move-up").disabled = result;
    document.getElementById("move-down").disabled = result;
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

    // Add an order value to the element as an array index
    createdSplit.value = splitEditorWindowData.splitCount;

    // Push the element to splits array
    splitEditorWindowData.splits.push(createdSplit);

    // Increase splitCount by 1
    splitEditorWindowData.splitCount++;
    // createdSplit.innerText = `${splitEditorWindowData.splitCount}. ${createdSplit.innerText}`;

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
        // Remove from splits array
        const orderIndex = parseInt(splitEditorWindowData.selectedSplit.value);
        splitEditorWindowData.splits.splice(orderIndex, 1);
        
        // Remove from the window
        splitEditorWindowData.selectedSplit.remove();
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

    // Create new timer and splits window
    window.windowCreator.createNewWindow("new-timer-and-splits", activityName);



    // window.close();
})

document.getElementById("cancel-button").addEventListener("click", () => {
    // Cancel editing, discard changes and close window
    window.close();
})