//---------------------------//
// Timer class for the timer //
//---------------------------//

// Debug tool on line 148 //

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
        this.canReset = false;
        this.isRunning = false;

        // Initialize the timer program
        this.initTimer();
    }

    start() {
        if (!this.isRunning) {
            this.canReset = true;
            this.isRunning = true;

            // Set the start time in milliseconds with date object
            this.startTime = Date.now();
    
            // Get the timer DOM element
            let timerLabel = document.getElementById("timer-label");

            // Check if timerLabel exists
            if (timerLabel) {
                // Create time counting function
                const countTime = () => {
                    const timeInMilliseconds = this.getTime();
                    timerLabel.innerText = this.formatTime(timeInMilliseconds);
                }
                
                // Use setInterval to start the timer
                this.timeCounter = window.setInterval(countTime, 25);
                console.log("Timer started!");
            }
        }
    }
    
    pause() {
        if (this.isRunning) {
            this.isRunning = false;

            // Update elapsed time
            this.timeElapsed = this.getTime();
            console.log("Time elapsed: ", this.timeElapsed);

            // Use clearInterval to pause the timer
            if (this.timeCounter) {
                window.clearInterval(this.timeCounter);
                console.log("Timer paused!");
            }

            // Get the timer DOM element
            let timerLabel = document.getElementById("timer-label");

            // Check if timerLabel exists
            if (timerLabel) {
                // Update timer DOM element
                const timeInMilliseconds = this.timeElapsed;
                timerLabel.innerText = this.formatTime(timeInMilliseconds);
            }
        }
    }
    
    reset() {
        if (this.canReset) {
            this.canReset = false;
            this.isRunning = false;

            // Reset elapsed time
            this.timeElapsed = 0;
            console.log("Timer reset!");

            // Use clearInterval to pause the timer
            if (this.timeCounter) {
                window.clearInterval(this.timeCounter);
            }

            // Reset timer values
            this.seconds = 0;
            this.minutes = 0;
            this.hours = 0;

            // Get the timer DOM element
            let timerLabel = document.getElementById("timer-label");

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

    // Format time before rendering it in DOM
    formatTime(timeInMilliseconds) {
        let timeText = "00:00:00.00";
        this.seconds = timeInMilliseconds / 1000;
        this.minutes = Math.floor(this.seconds / 60);
        this.hours = Math.floor(this.minutes / 60);

        // Reset seconds and minutes back to 0 when 60 is reached
        if (this.seconds >= 60) {
            this.seconds -= 60 * this.minutes;
        }

        if (this.minutes >= 60) {
            this.minutes -= 60 * this.hours;
        }

        // Used in the formatted text
        let secondsText = this.seconds.toFixed(2);
        let minutesText = this.minutes.toFixed(0);
        let hoursText = this.hours.toFixed(0);

        // Check if 0 needs to be added to the beginning
        if (parseFloat(secondsText) < 10) {
            secondsText = `0${secondsText}`;
        }

        if (parseFloat(minutesText) < 10) {
            minutesText = `0${minutesText}`;
        }

        if (parseFloat(hoursText) < 10) {
            hoursText = `0${hoursText}`;
        }
        
        // Parse into string format
        timeText = `${hoursText}:${minutesText}:${secondsText}`;

        // (Debug tool) Make the timer go faster //
        // this.timeElapsed += 1000;

        return timeText;
    }

    initTimer() {
        // DOM button events //
        document.getElementById("start-button").addEventListener("click", () => {
            this.start();
        })
        
        document.getElementById("pause-button").addEventListener("click", () => {
            this.pause();
        })
        
        document.getElementById("reset-button").addEventListener("click", () => {
            this.reset();
        })
    }
}

// Initialize timer program //
const timer = new Timer();