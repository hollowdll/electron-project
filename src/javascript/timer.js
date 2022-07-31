//---------------------------//
// Timer class for the timer //
//---------------------------//

"use strict";

class Timer {
    constructor() {
        // Variables used by the timer
        this.startTime = 0;
        this.timeElapsed = 0;
        this.seconds = 0;
        this.minutes = 0;
        this.hours = 0;
        this.timeCounter = undefined;
        this.canPause = false;
        this.canStart = true;
        this.canReset = false;

        // Initialize the timer program
        this.initTimer();
    }

    start() {
        if (this.canStart) {
            // Change values
            this.canStart = false;
            this.canPause = true;
            this.canReset = true;

            // Set the start time in milliseconds with date object
            this.startTime = Date.now();
    
            // Get the timer DOM element
            let timerLabel = document.getElementById("timerLabel");

            // Check if timerLabel exists
            if (timerLabel) {
                // Create time counting function
                const countTime = () => {
                    const timeInMilliseconds = this.getTime();
                    timerLabel.innerText = timeInMilliseconds;
                }
                
                // Use setInterval to start the timer
                this.timeCounter = window.setInterval(countTime, 100);
                console.log("Timer started!");
            }
        }
    }
    
    pause() {
        if (this.canPause) {
            this.canPause = false;
            this.canStart = true;

            // Update elapsed time
            this.timeElapsed = this.getTime();
            console.log("Time elapsed: ", this.timeElapsed);

            // Use clearInterval to pause the timer
            if (this.timeCounter) {
                window.clearInterval(this.timeCounter);
                console.log("Timer paused!");
            }

            // Get the timer DOM element
            let timerLabel = document.getElementById("timerLabel");

            // Check if timerLabel exists
            if (timerLabel) {
                // Update timer DOM element
                const timeInMilliseconds = this.timeElapsed;
                timerLabel.innerText = timeInMilliseconds;
            }
        }
    }
    
    reset() {
        if (this.canReset) {
            this.CanReset = false;
            this.canStart = true;
            this.canPause = false;

            // Reset elapsed time
            this.timeElapsed = 0;
            console.log("Timer reset!");

            // Use clearInterval to pause the timer
            if (this.timeCounter) {
                window.clearInterval(this.timeCounter);
            }

            // Pause the timer and reset values
            /*
            this.seconds = 0;
            this.minutes = 0;
            this.hours = 0;
            */

            // Get the timer DOM element
            let timerLabel = document.getElementById("timerLabel");

            // Check if timerLabel still exists
            if (timerLabel) {
                // Reset the text to default
                timerLabel.innerText = "00:00:00.00";
            }
        }
    }

    getTime() {
        return this.timeElapsed + Date.now() - this.startTime;
    }

    initTimer() {
        // DOM button events //
        document.getElementById("startButton").addEventListener("click", () => {
            this.start();
        })
        
        document.getElementById("pauseButton").addEventListener("click", () => {
            this.pause();
        })
        
        document.getElementById("resetButton").addEventListener("click", () => {
            this.reset();
        })
    }
}


// (Temporary) Disabled implementation //
// Initialize timer //

/*
const initTimer = () => {
    // create a timer object
    const timer = new Timer();

    // Button events //
    document.getElementById("startButton").addEventListener("click", () => {
        timer.start();
    })
    
    document.getElementById("pauseButton").addEventListener("click", () => {
        timer.pause();
    })
    
    document.getElementById("resetButton").addEventListener("click", () => {
        timer.reset();
    })
}

initTimer();
*/

