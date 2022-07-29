//-------------------------------//
// Timer functions for the timer //
//-------------------------------//

"use strict";

class Timer {
    constructor() {
        this.seconds = 0;
        this.minutes = 0;
        this.hours = 0;
        this.isPaused = true;
    }

    start() {
        console.log("Timer started!");
    
        // Get the timer DOM element
        let timerLabel = document.getElementById("timerLabel");

        // Check if timerLabel exists
        if (timerLabel) {
            // Start the timer
            this.isPaused = false;
            while (this.isPaused == false) {

            }
        }
    }
    
    pause() {
        console.log("Timer paused!");

        // Pause the timer
        this.isPaused = true;

        
    }
    
    reset() {
        console.log("Timer reset!");

        // Get the timer DOM element
        let timerLabel = document.getElementById("timerLabel");

        // Pause the timer and reset values
        this.isPaused = true;
        this.seconds = 0;
        this.minutes = 0;
        this.hours = 0;

        // Check if timerLabel still exists
        if (timerLabel) {

        }
    }
}


// Initialize timer //

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