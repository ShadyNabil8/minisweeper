let timerElement = document.getElementById('timer'); // Get the timer element
let timerInterval; // Variable to store the interval ID

let seconds = 0;
let minutes = 0;

// Function to update the timer
function updateTimer() {
    seconds++;
    if (seconds >= 60) {
        seconds = 0;
        minutes++;
    }
    timerElement.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

// Start the timer
export function startTimer() {
    timerInterval = setInterval(updateTimer, 1000); // Update the timer every second (1000 milliseconds)
}

// Stop the timer
export function stopTimer() {
    clearInterval(timerInterval); // Clear the interval to stop the timer
}

// Reset the timer
function resetTimer() {
    stopTimer(); // Stop the timer if running
    seconds = 0;
    minutes = 0;
    updateTimer(); // Update the timer display
}

