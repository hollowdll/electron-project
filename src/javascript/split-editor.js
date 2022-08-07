//------------------------------------------//
// Split Editor window events and functions //
//------------------------------------------//

// Track data of the window //
let splitEditorWindowData = {
    currentUIView: "splits",
    selectedSplit: null,

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
const createNewSplit = () => {
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

    // when a split is selected
    createdSplit.addEventListener("click", () => {
        splitEditorWindowData.selectedSplit = createdSplit;
        createdSplit.style["background-color"] = "rgb(160,160,160)";
    });
}


// input events //

// Activity name input
document.getElementById("activity").addEventListener("submit", preventWindowReload)

// Category name input
document.getElementById("category").addEventListener("submit", preventWindowReload)

// Split name input
document.getElementById("split-form").addEventListener("submit", preventWindowReload)

// New split
document.getElementById("add-split").addEventListener("click", createNewSplit)

// Remove split
document.getElementById("remove-split").addEventListener("click", () => {
    
})

// Move split
document.getElementById("move-split").addEventListener("click", () => {
    
})



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