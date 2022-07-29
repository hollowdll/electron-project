//-------------------------------//
// Timer functions for the timer //
//-------------------------------//

function startTimer() {
    console.log("Timer started!");
}

function pauseTimer() {
    console.log("Timer paused!");
}

function resetTimer() {
    console.log("Timer reset!");
}


// Button events //

document.getElementById("startButton").addEventListener("click", () => {
    startTimer();
})

document.getElementById("pauseButton").addEventListener("click", () => {
    pauseTimer();
})

document.getElementById("resetButton").addEventListener("click", () => {
    resetTimer();
})