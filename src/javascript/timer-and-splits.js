//----------------------------------------------//
// Timer and splits window events and functions //
//----------------------------------------------//

"use strict";

// Track data of this window
let windowData = {
    colors: {
        splitTimeSave: null,
        splitTimeLost: null,
        splitIndicator: null
    },
}

// When this window is created
window.windowCreator.onWindowCreated((event, data) => {

    // Assign passed data to this window
    const activityName = document.getElementById("activity");
    activityName.innerText = data.activity;
    activityName.style.color = data.customization.activityColor;
    
    const categoryName = document.getElementById("category");
    categoryName.innerText = data.category;
    categoryName.style.color = data.customization.categoryColor;

    // Create split elements
    if (data.splits.length > 0) {
        for (let i = 0; i < data.splits.length; i++) {
            const splitElem = document.getElementById("split-holder").cloneNode(true);
            const splitElemChildren = Object.values(splitElem.children);
            splitElem.style.display = "block";
    
            for (let child of splitElemChildren) {
                // Assign data and customization
                if (child.id === "split-name") {
                    child.innerText = data.splits[i];
                    child.style.color = data.customization.splitTextColor;
                }
                else if (child.id === "split-time-save" || child.id === "split-time") {
                    child.style.color = data.customization.splitTimeColor;
                }
            }
    
            document.querySelector(".split-list").appendChild(splitElem);
        }
    }

    // Assign customization to this window
    document.getElementById("timer-label").style.color = data.customization.timerColor;
    document.getElementById("personal-best-value").style.color = data.customization.personalBestTimeColor;
    windowData.colors.splitTimeSave = data.customization.splitTimeSaveColor;
    windowData.colors.splitTimeLost = data.customization.splitTimeLostColor;
    windowData.colors.splitIndicator = data.customization.splitIndicator;

})

