//---------------------------//
// Timer class for the timer //
//---------------------------//

"use strict";

class Timer {
    constructor() {
        // Variables used by the timer
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
            console.log("Timer started!");
    
            // Get the timer DOM element
            let timerLabel = document.getElementById("timerLabel");

            // Check if timerLabel exists
            if (timerLabel) {
                // Create time counting function
                const countTime = () => {
                    this.seconds++;
                    console.log(this.seconds);
                }
            
                // Use setInterval to start the timer
                this.timeCounter = window.setInterval(countTime, 1000);
            }
        }
    }
    
    pause() {
        if (this.canPause) {
            console.log("Timer paused!");

            // Use clearInterval to pause the timer
            if (this.timeCounter) {
                window.clearInterval(this.timeCounter);
                console.log("Timer was paused!");
            }
        }
    }
    
    reset() {
        if (this.canReset) {
            console.log("Timer reset!");

            // Get the timer DOM element
            let timerLabel = document.getElementById("timerLabel");

            // Pause the timer and reset values
            this.seconds = 0;
            this.minutes = 0;
            this.hours = 0;

            // Check if timerLabel still exists
            if (timerLabel) {

            }
        }
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

