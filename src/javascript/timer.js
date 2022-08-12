//---------------------------//
// Timer class for the timer //
//---------------------------//

"use strict";

class Timer {
    constructor() {
        // Variables used by the timer
        this.startTime = 0;
        this.timeElapsed = 0;
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
                    timerLabel.innerText = this.formatTimeToShort(timeInMilliseconds);
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
                timerLabel.innerText = this.formatTimeToShort(timeInMilliseconds);
            }
        }
    }
    
    reset() {
        if (this.canReset) {
            this.canReset = false;
            this.isRunning = false;

            // Reset elapsed time
            this.timeElapsed = 0;
            this.startTime = 0;
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
                timerLabel.innerText = "0.00";
            }
        }
    }

    getTime() {
        if (this.startTime <= 0) {
            return 0;
        }
        else {
            return this.timeElapsed + Date.now() - this.startTime;
        }
    }

    getTimeElapsed() {
        return this.timeElapsed;
    }

    // Format time before rendering it in DOM
    formatTime(timeInMilliseconds, convertToSplitTime) {
        let timeText = "00:00:00.00";
        let seconds = timeInMilliseconds / 1000;
        let minutes = Math.floor(seconds / 60);
        let hours = Math.floor(minutes / 60);

        // Reset seconds and minutes back to 0 when 60 is reached
        if (seconds >= 60) {
            seconds -= 60 * minutes;
        }

        if (minutes >= 60) {
            minutes -= 60 * hours;
        }

        // Used in the formatted text
        let secondsText = seconds.toFixed(2);
        let minutesText = minutes.toFixed(0) + ":";
        let hoursText = hours.toFixed(0) + ":";

        // If convertToSplitTime is true
        if (convertToSplitTime) {
            secondsText = seconds.toFixed(0);
        }

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
        
        // If convertToSplitTime is true
        if (convertToSplitTime) {
            hoursText = hours.toFixed(0) + ":";

            if (parseFloat(hoursText) < 1) {
                hoursText = "";
                minutesText = minutes.toFixed(0) + ":";
            }
        }
        
        // Parse into string format
        timeText = `${hoursText}${minutesText}${secondsText}`;

        // (Debug tool) Make the timer go faster //
        // this.timeElapsed += 10000;

        return timeText;
    }

    // Format time to shorter version
    formatTimeToShort(timeInMilliseconds) {
        let timeText = "0.00";
        let seconds = timeInMilliseconds / 1000;
        let minutes = Math.floor(seconds / 60);
        let hours = Math.floor(minutes / 60);

        // Reset seconds and minutes back to 0 when 60 is reached
        if (seconds >= 60) {
            seconds -= 60 * minutes;
        }

        if (minutes >= 60) {
            minutes -= 60 * hours;
        }

        // Used in the formatted text
        let secondsText = seconds.toFixed(2);
        let minutesText = minutes.toFixed(0) + ":";
        let hoursText = hours.toFixed(0) + ":";

        // Check if 0 needs to be added to the beginning
        if (parseFloat(secondsText) < 10 && parseFloat(minutesText) >= 1) {
            secondsText = `0${secondsText}`;
        }

        if (parseFloat(secondsText) < 10 && parseFloat(hoursText) >= 1 && parseFloat(minutesText) < 1) {
            secondsText = `0${secondsText}`;
        }

        if (parseFloat(minutesText) < 10 && parseFloat(hoursText) >= 1) {
            minutesText = `0${minutesText}`;
        }

        // Check if hours and minutes need to be omitted
        if (parseFloat(hoursText) < 1) {
            hoursText = "";
        }

        if (parseFloat(minutesText) < 1 && parseFloat(hoursText) < 1) {
            minutesText = "";
        }
        
        // Parse into string format
        timeText = `${hoursText}${minutesText}${secondsText}`;

        // (Debug tool) Make the timer go faster //
        // this.timeElapsed += 10000;

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