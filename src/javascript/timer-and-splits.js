//----------------------------------------------//
// Timer and splits window events and functions //
//----------------------------------------------//

"use strict";

// Track data of this window and splits
let windowData = {
    colors: {
        splitBackground: "rgb(200,200,200)",
        splitTimeSave: null,
        splitTimeLost: null,
        splitIndicator: null,
    },
    currentSplit: null,
    splitsCompleted: 0,
    totalScrollTopOffset: 0,
    personalBestTimeMilliseconds: null,
    personalBestSplitTimes: [],
    isFinished: false,
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


    // Assign customization to this window
    document.getElementById("timer-label").style.color = data.customization.timerColor;
    document.getElementById("personal-best-value").style.color = data.customization.personalBestTimeColor;

    windowData.colors.splitTimeSave = data.customization.splitTimeSaveColor;
    windowData.colors.splitTimeLost = data.customization.splitTimeLostColor;
    windowData.colors.splitIndicator = data.customization.splitIndicatorColor;


    // Create split elements
    if (data.splits.length > 0) {
        // Get the template split
        const splitElemTemplate = document.getElementById("split-holder");

        for (let i = 0; i < data.splits.length; i++) {
            const splitElem = splitElemTemplate.cloneNode(true);
            const splitElemChildren = Object.values(splitElem.children);
            splitElem.style.display = "block";
    
            for (const child of splitElemChildren) {
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

        // Delete the template split
        splitElemTemplate.remove();

        // Make the first split current split
        windowData.currentSplit = document.querySelector(".split-list").firstElementChild;
        windowData.currentSplit.style["background-color"] = windowData.colors.splitIndicator;
    }

})


//--------------------------//
// Split time functionality //
//--------------------------//

// Next split button //
document.getElementById("next-split").addEventListener("click", () => {
    // Make sure there is at least 1 split
    if (windowData.currentSplit && !windowData.isFinished) {
        // Get the timer's time in milliseconds
        let elapsedTime = 0;

        if (timer.isRunning) {
            elapsedTime = timer.getTime();
        } else {
            elapsedTime = timer.getTimeElapsed();
        }

        const elapsedTimeText = timer.formatTime(elapsedTime, true);

        // Get children of the current split
        const splitElemChildren = Object.values(windowData.currentSplit.children);

        // Assign times to current split
        for (const child of splitElemChildren) {
            if (child.id === "split-time") {
                child.innerText = elapsedTimeText;
                child.value = elapsedTime;
            }
            else if (child.id === "split-time-save") {
                // Calculate time save/lost compared to split time

            }
        }

        // Check if there is next split
        const nextSplit = windowData.currentSplit.nextElementSibling;
        if (nextSplit) {
            // Get the offset between splits for auto scrolling
            const scrollTopOffset = nextSplit.offsetTop - windowData.currentSplit.offsetTop;

            // Move current split indicator to the next split
            windowData.currentSplit.style["background-color"] = windowData.colors.splitBackground;
            windowData.currentSplit = nextSplit;
            nextSplit.style["background-color"] = windowData.colors.splitIndicator;
            // Increment by 1
            windowData.splitsCompleted++;

            // Scroll list down automatically if no visible splits
            if (windowData.splitsCompleted > 5) {
                document.querySelector(".split-list").scrollTo({ top: windowData.totalScrollTopOffset + scrollTopOffset });
                windowData.totalScrollTopOffset += scrollTopOffset;
            }
        }
        else {
            // Finish if no next split
            if (!windowData.isFinished) {
                windowData.isFinished = true;
                windowData.splitsCompleted++;

                // Pause timer
                timer.pause();

                // Get the final time
                const finalTime = timer.formatTimeToShort(elapsedTime);
                document.getElementById("timer-label").innerText = finalTime;

                // Update personal best time if new record
                if (elapsedTime < windowData.personalBestTimeMilliseconds || windowData.personalBestTimeMilliseconds == null) {
                    windowData.personalBestTimeMilliseconds = elapsedTime;
                    document.getElementById("personal-best-value").innerText = finalTime;

                    // Reset old PB split times
                    windowData.personalBestSplitTimes = [];

                    // Save personal best split times
                    const splitElements = Object.values(document.querySelector(".split-list").children);
                    for (const splitElem of splitElements) {
                        const splitElemChildren = Object.values(splitElem.children);
                        for (const splitData of splitElemChildren) {
                            // Check if data is split time
                            if (splitData.id === "split-time") {
                                // Save the time in milliseconds
                                windowData.personalBestSplitTimes.push(splitData.value);
                            }
                        }
                    }

                    console.log(windowData.personalBestSplitTimes);
                }
            }
        }

        // Check splits completed
        console.log(windowData.splitsCompleted);


    }
})


// Reset button to reset splits //
document.getElementById("reset-button").addEventListener("click", () => {
    // Make sure there is at least 1 split
    if (windowData.currentSplit) {
        const splitList = document.querySelector(".split-list");

        // Reset split data
        windowData.splitsCompleted = 0;
        windowData.isFinished = false;
        windowData.totalScrollTopOffset = 0;

        // Scroll split list to top
        splitList.scrollTo({ top: 0 });

        // Move split indicator to the first split
        windowData.currentSplit.style["background-color"] = windowData.colors.splitBackground;
        windowData.currentSplit = splitList.firstElementChild;
        windowData.currentSplit.style["background-color"] = windowData.colors.splitIndicator;

        // Change split times
        const splitElements = Object.values(splitList.children);
        for (const splitElem of splitElements) {
            const splitElemChildren = Object.values(splitElem.children);
            for (const splitData of splitElemChildren) {
                if (splitData.id === "split-time") {
                    // Check if there is a PB time
                    if (windowData.personalBestTimeMilliseconds != null) {
                        // Reset split times to PB split times
                        const splitTimeMilliseconds = windowData.personalBestSplitTimes[splitElements.indexOf(splitElem)];
                        splitData.value = splitTimeMilliseconds;
                        splitData.innerText = timer.formatTime(splitTimeMilliseconds, true);
                    }
                    else {
                        // Reset all split data
                        splitData.innerText = "--";
                        splitData.value = null;
                    }
                }
                else if (splitData.id === "split-time-save") {
                    splitData.innerText = "--";
                }
            }
        }
    }
})