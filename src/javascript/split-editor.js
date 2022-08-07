//------------------------------------------//
// Split Editor window events and functions //
//------------------------------------------//

// Track data of the window //
let splitEditorWindowData = {
    currentUIView: "splits",

}

// Make splits button's color active when window is opened
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

// input events //

// Function that prevents reloading the window when forms are submitted
const preventWindowReload = (event) => {
    event.preventDefault();
}

// Activity name input
document.getElementById("activity").addEventListener("submit", preventWindowReload)

// Category name input
document.getElementById("category").addEventListener("submit", preventWindowReload)



//----------------//
// Customize view //
//----------------//



// Button events
