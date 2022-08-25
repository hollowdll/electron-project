//----------------------------------------------//
// Timer and splits window events and functions //
//----------------------------------------------//

"use strict";

// Track data of this window and splits
let windowData = {
    colors: {
        splitBackground: "rgb(80,80,80)",
        splitBackground2: "rgb(60,60,60)",
        splitTimeText: null,
        splitTimeSave: null,
        splitTimeLost: null,
        splitIndicator: null,
    },
    dataForSavefile: null,
    currentSplit: null,
    splitsCompleted: 0,
    totalScrollTopOffset: 0,
    personalBestTimeMilliseconds: null,
    personalBestSplitTimes: [],
    isFinished: false,
}


// Create PB data after a savefile has been opened if there is a PB
const createPersonalBestData = () => {
    const splitList = document.querySelector(".split-list");
    document.getElementById("personal-best-value").innerText = timer.formatTimeToShort(windowData.personalBestTimeMilliseconds);

    // Loop through all split elements
    const splitElements = Object.values(splitList.children);
    for (const splitElem of splitElements) {
        const splitElemChildren = Object.values(splitElem.children);
        for (const splitData of splitElemChildren) {
            if (splitData.id === "split-time") {
                // Set split times
                const splitTimeMilliseconds = windowData.personalBestSplitTimes[splitElements.indexOf(splitElem)];
                splitData.value = splitTimeMilliseconds;
                splitData.innerText = timer.formatTime(splitTimeMilliseconds, true);
            }
        }
    }
}


// Get window data to save a file when main process requests
window.appFileSystem.getTimerAndSplitsData((event) => {
    // Create a deep copy of data
    let dataToSend = JSON.parse(JSON.stringify(windowData.dataForSavefile));

    // Check if window has data
    if (dataToSend != null) {
        // Name of the savefile
        let savefileName = "Untitled";

        if (typeof dataToSend.activity === "string" && typeof dataToSend.category === "string") {
            // Remove all white spaces
            const activityText = dataToSend.activity.replace(/ /g, "");
            const categoryText = dataToSend.category.replace(/ /g, "");
            savefileName = `${activityText}-${categoryText}`;
        }

        // Get possible PB times
        dataToSend["personalBestTimeMilliseconds"] = windowData.personalBestTimeMilliseconds;
        dataToSend["personalBestSplitTimes"] = windowData.personalBestSplitTimes;

        // Convert into JSON format. Savefile will be saved in this format
        dataToSend = `${JSON.stringify(dataToSend, null, "\t")}`;

        // Send data back to main process
        event.sender.send("send-timer-and-splits-data", dataToSend, savefileName);
    }
})


// When this window is created
window.windowCreator.onWindowCreated((event, data) => {
    // Save data for later usage
    windowData.dataForSavefile = data;

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

    windowData.colors.splitTimeText = data.customization.splitTimeColor;
    windowData.colors.splitTimeSave = data.customization.splitTimeSaveColor;
    windowData.colors.splitTimeLost = data.customization.splitTimeLostColor;
    windowData.colors.splitIndicator = data.customization.splitIndicatorColor;


    // Create split elements
    if (data.splits.length > 0) {
        // Get the template split
        const splitElemTemplate = document.getElementById("split-holder");
        
        // Get the split list
        const splitList = document.querySelector(".split-list");

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
    
            splitList.appendChild(splitElem);
            
            // Get the order of the newly created split
            const splitOrder = Object.values(splitList.children).length - 1;   // Decrease the hidden template split
            
            // Check if this split's order number is even
            if (splitOrder % 2 == 0) {
                splitElem.style["background-color"] = windowData.colors.splitBackground2;
                splitElem.value = "order=even";
            }
        }

        // Delete the template split
        splitElemTemplate.remove();

        // Make the first split current split
        windowData.currentSplit = splitList.firstElementChild;
        windowData.currentSplit.style["background-color"] = windowData.colors.splitIndicator;

        // Check if there is a personal best
        if (data.personalBestTimeMilliseconds != null && data.personalBestSplitTimes != null) {
            // Assign data
            windowData.personalBestSplitTimes = data.personalBestSplitTimes;
            windowData.personalBestTimeMilliseconds = data.personalBestTimeMilliseconds;
            createPersonalBestData();
        }
    }
})


//--------------------------//
// Split time functionality //
//--------------------------//

// Move split indicator to next split
const moveToNextSplit = () => {
    // Make sure there is at least 1 split
    if (windowData.currentSplit && !windowData.isFinished) {
        // Get the split list
        const splitList = document.querySelector(".split-list");
        const splitListElements = Object.values(splitList.children);

        // Get the timer's time in milliseconds
        let elapsedTime = 0;

        if (timer.isRunning) {
            elapsedTime = timer.getTime();
        } else {
            elapsedTime = timer.getTimeElapsed();
        }

        // Get the time format for split times
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
                // Check if there is a PB (Personal Best)
                if (windowData.personalBestTimeMilliseconds != null) {
                    const pbSplitTime = windowData.personalBestSplitTimes[splitListElements.indexOf(windowData.currentSplit)];
                    
                    // Calculate time save/lost compared to split time
                    if (pbSplitTime != null) {
                        const timeDifference = elapsedTime - pbSplitTime;
                        let isNegative = (timeDifference < 0) ? true : false;
                        const timeSaveText = timer.formatTimeToTimeSave(timeDifference, isNegative);
                        child.innerText = timeSaveText;

                        // Assign the right text color
                        
                        if (isNegative) {
                            child.style.color = windowData.colors.splitTimeSave;
                        } else {
                            child.style.color = windowData.colors.splitTimeLost;
                        }
                        
                    }
                }
            }
        }

        // Check if there is next split
        const nextSplit = windowData.currentSplit.nextElementSibling;
        if (nextSplit) {
            // Get the offset between splits for auto scrolling
            const scrollTopOffset = nextSplit.offsetTop - windowData.currentSplit.offsetTop;

            // Check if current split's order is even
            if (windowData.currentSplit.value == "order=even") {
                windowData.currentSplit.style["background-color"] = windowData.colors.splitBackground2;
            } else {
                windowData.currentSplit.style["background-color"] = windowData.colors.splitBackground;
            }

            // Move current split indicator to the next split
            windowData.currentSplit = nextSplit;
            nextSplit.style["background-color"] = windowData.colors.splitIndicator;
            // Increment by 1
            windowData.splitsCompleted++;

            // Scroll list down automatically if no visible splits
            if (windowData.splitsCompleted > 5) {
                splitList.scrollTo({ top: windowData.totalScrollTopOffset + scrollTopOffset });
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
                    const splitElements = Object.values(splitList.children);
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
        

    }
}

// Next split button //
document.getElementById("next-split").addEventListener("click", () => {
    moveToNextSplit();
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

        // If current split's order is even
        if (windowData.currentSplit.value == "order=even") {
            windowData.currentSplit.style["background-color"] = windowData.colors.splitBackground2;
        } else {
            windowData.currentSplit.style["background-color"] = windowData.colors.splitBackground;
        }

        // Move split indicator to the first split
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
                    // Reset split time saves
                    splitData.innerText = "--";
                    splitData.style.color = windowData.colors.splitTimeText;
                }
            }
        }
    }
})


// Reset Personal Best Button //
document.getElementById("reset-pb").addEventListener("click", () => {
    if (windowData.personalBestTimeMilliseconds != null) {
        // Reset PB time and its splits
        windowData.personalBestTimeMilliseconds = null;
        windowData.personalBestSplitTimes = [];
        document.getElementById("personal-best-value").innerText = "--";
    }
})


// When keyboard shortcuts are received
window.keyboardShortcuts.onKeyboardShortcut((event, message) => {
    // Next split button
    if (message === "next-split") {
        moveToNextSplit();
    }
})