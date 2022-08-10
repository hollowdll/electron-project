//----------------------------------------------//
// Timer and splits window events and functions //
//----------------------------------------------//

// When this window is created
window.windowCreator.onWindowCreated((event, data) => {

    // Assign passed data to this window
    document.getElementById("activity").innerText = data.activity;
    document.getElementById("category").innerText = data.category;

    // Create split elements
    for (let i = 0; i < data.splits.length; i++) {
        const splitElem = document.getElementById("split-holder").cloneNode(true);
        const splitElemChildren = splitElem.childNodes;
        splitElem.style.display = "block";

        for (let child of splitElemChildren) {
            if (child.id === "split-name") {
                child.innerText = data.splits[i];
            }
        }

        document.querySelector(".split-list").appendChild(splitElem);

    }

    console.log(data.splits);
})

