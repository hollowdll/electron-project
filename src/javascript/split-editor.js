//------------------------------------------//
// Split Editor window events and functions //
//------------------------------------------//


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
