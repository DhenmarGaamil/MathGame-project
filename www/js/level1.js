document.getElementById('index').addEventListener('click', function () {
    window.location.href = 'index.html'; 
});

document.addEventListener('DOMContentLoaded', function () {
    // Initialize ang game variables
    let num1, num2, answer, score = 0, lives = 3, level = 1;

    // Define level thresholds and max number range (change these values as needed)
    const levelThresholds = [3, 6, 9]; // Adjust the thresholds for each level
    const maxNumberRange = [100, 200, 300]; // Adjust the max number range for each level

    // Function to generate random two-digit numbers for addition based on the level
    function generateNumbers() {
        const maxRange = maxNumberRange[level - 1];
        num1 = Math.floor(Math.random() * (maxRange - 10)) + 10; // Random number within the level's max range
        num2 = Math.floor(Math.random() * (maxRange - 10)) + 10; // Random number within the level's max range
        answer = num1 + num2;
        document.getElementById('num1').textContent = num1;
        document.getElementById('num2').textContent = num2;
    }

    //  to update the score and lives display
    function updateDisplay() {
        document.getElementById('score').textContent = score;
        document.getElementById('lives').innerHTML = '<i class="heart-icon"></i>'.repeat(lives);
        document.getElementById('level').textContent = "Level " + level;
    }

    // Function para i check ang player has passed a level
    function checkLevel() {
        if (score >= levelThresholds[level - 1]) {
            level++;
           
            document.getElementById('game').classList.add('passed-level');
            
        }
    }

    // Function para vibrate the device
    function vibrateDevice() {
        navigator.vibrate(500); 
    }

    // Function para ma  check the user's answer
    function checkAnswer() {
        const userInput = parseInt(document.getElementById('userInput').value);
        if (userInput === answer) {
            score += 50; // Add 50 points kada correct answer
            level++; // Increment the level
            if (level > levelThresholds.length) {
                level = levelThresholds.length; // Cap the level at the last defined threshold
            }
            generateNumbers();
        } else {
            lives--;
            if (lives === 0) {
                alert('Game over! Your final score is: ' + score);
                // i Reset ang game to level 1
                score = 0;
                lives = 3;
                level = 1;
                generateNumbers();
                document.getElementById('game').classList.remove('passed-level');
            } else {
                alert('Incorrect! Try again.'); // Display a message for incorrect answers
                generateNumbers();
                vibrateDevice(); // Vibrate ang device para sa incorrect answers
            }
        }
        updateDisplay();
        document.getElementById('userInput').value = '';
    }

    // Event listener para Check button
    document.getElementById('checkAnswer').addEventListener('click', checkAnswer);

    // Initialize ang game
    generateNumbers();
    updateDisplay();
});