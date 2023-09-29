document.getElementById('index').addEventListener('click', function () {
    window.location.href = 'index.html'; // Change the URL to your level selection page
});

document.addEventListener('DOMContentLoaded', function () {
    // Initialize game variables
    let num1, num2, answer, score = 0, lives = 3, level = 1;

    // Define level thresholds (change these values as needed)
    const levelThresholds = [3, 6, 9]; // Adjust the thresholds for each level

    // Function to generate random two-digit numbers for subtraction based on the level
    function generateNumbers() {
        const minNum = level * 10; // Adjust the minimum number based on the level
        const maxNum = minNum + 89; // Adjust the maximum number accordingly
        num1 = Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum; // Random two-digit number
        num2 = Math.floor(Math.random() * (num1 - minNum + 1)) + minNum; // Random two-digit number less than num1 for subtraction
        answer = num1 - num2;
        document.getElementById('num1').textContent = num1;
        document.getElementById('num2').textContent = num2;
    }

    // Function to update the score and lives display
    function updateDisplay() {
        document.getElementById('score').textContent = score;
        document.getElementById('lives').innerHTML = '<i class="heart-icon"></i>'.repeat(lives);
        document.getElementById('level').textContent = "Level " + level;
    }

    // Function to check if the player has passed a level
    function checkLevel() {
        if (score >= levelThresholds[level - 1]) {
            level++;
            // Add a CSS class to style passed levels
            document.getElementById('game').classList.add('passed-level');
            // You can define additional CSS styles for "passed-level" in your level1.css file
        }
    }

    // Function to vibrate the device (for mobile devices only)
    function vibrateDevice() {
        if (navigator.vibrate) {
            navigator.vibrate(500); // Vibrate for 500 milliseconds
        }
    }

    // Function to check the user's answer for subtraction
    function checkAnswer() {
        const userInput = parseInt(document.getElementById('userInput').value);
        if (userInput === answer) {
            score += 50; // Add 50 points for a correct answer
            level++; // Increment the level
            generateNumbers(); // Generate new numbers for the next question
        } else {
            lives--;
            if (lives === 0) {
                alert('Game over! Your final score is: ' + score);
                // Reset the game to level 1
                score = 0;
                lives = 3;
                level = 1;
            } else {
                alert('Incorrect! Try again.'); // Display a message for incorrect answers
                generateNumbers(); // Generate new numbers for the next question
                vibrateDevice(); // Vibrate the device for incorrect answers (if supported)
            }
        }
        updateDisplay();
        document.getElementById('userInput').value = '';
    }

    // Event listener for the Check button
    document.getElementById('checkAnswer').addEventListener('click', checkAnswer);

    // Initialize the game with subtraction
    generateNumbers();
    updateDisplay();
});