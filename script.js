// ==========================================
// ROCK PAPER SCISSORS PRO
// Part 1
// ==========================================

// ==============================
// VARIABLES
// ==============================

let playerName = "";
let playerScore = 0;
let computerScore = 0;
let round = 0;
const maxRounds = 5;

const choices = ["rock", "paper", "scissors"];

const icons = {
    rock: "✊",
    paper: "✋",
    scissors: "✌️"
};

// ==============================
// DOM ELEMENTS
// ==============================

const playerNameInput = document.getElementById("playerName");

const startBtn = document.getElementById("startBtn");

const rockBtn = document.getElementById("rockBtn");
const paperBtn = document.getElementById("paperBtn");
const scissorsBtn = document.getElementById("scissorsBtn");

const resetBtn = document.getElementById("resetBtn");
const themeBtn = document.getElementById("themeBtn");

const playerScoreText = document.getElementById("playerScore");
const computerScoreText = document.getElementById("computerScore");
const roundText = document.getElementById("round");

const resultText = document.getElementById("resultText");

const historyList = document.getElementById("historyList");
const winnerModal = document.getElementById("winnerModal");
const winnerMessage = document.getElementById("winnerMessage");
const playAgainBtn = document.getElementById("playAgainBtn");
const playerChoiceIcon =
document.getElementById("playerChoiceIcon");

const computerChoiceIcon =
document.getElementById("computerChoiceIcon");

// ==============================
// SOUND EFFECTS
// ==============================

const clickSound = new Audio("sounds/click.mp3");
const winSound = new Audio("sounds/win.mp3");
const loseSound = new Audio("sounds/lose.mp3");
const drawSound = new Audio("sounds/draw.mp3");

clickSound.volume = 0.5;
winSound.volume = 0.7;
loseSound.volume = 0.7;
drawSound.volume = 0.6;
// ==============================
// INITIAL STATE
// ==============================

disableGameButtons();

// ==============================
// START GAME
// ==============================

startBtn.addEventListener("click", startGame);

function startGame() {

    playerName = playerNameInput.value.trim();

    if (playerName === "") {

        alert("Please enter your name.");

        return;

    }

    playerScore = 0;
    computerScore = 0;
    round = 0;

    updateScoreBoard();

    historyList.innerHTML = "";

    playerChoiceIcon.textContent = "❔";
    computerChoiceIcon.textContent = "❔";

    resultText.innerHTML =
    `Welcome <b>${playerName}</b> 👋 <br>
    Choose Rock, Paper or Scissors`;

    enableGameButtons();

}
// ==============================
// BUTTON EVENTS
// ==============================

rockBtn.addEventListener("click", function () {
    playGame("rock");
});

paperBtn.addEventListener("click", function () {
    playGame("paper");
});

scissorsBtn.addEventListener("click", function () {
    playGame("scissors");
});

// ==============================
// MAIN GAME
// ==============================

function playGame(playerChoice) {
    clickSound.currentTime = 0;
    clickSound.play();

    if (round >= maxRounds) {
        return;
    }

    const randomIndex = Math.floor(Math.random() * choices.length);

    const computerChoice = choices[randomIndex];

    // Show Icons
    playerChoiceIcon.textContent = icons[playerChoice];
    computerChoiceIcon.textContent = icons[computerChoice];

    let result = "";

    if (playerChoice === computerChoice) {

    result = "🤝 Draw";

    drawSound.currentTime = 0;
    drawSound.play();

}

    else if (

        (playerChoice === "rock" && computerChoice === "scissors") ||

        (playerChoice === "paper" && computerChoice === "rock") ||

        (playerChoice === "scissors" && computerChoice === "paper")

    ) {

       playerScore++;

        result = "🎉 You Win";

        winSound.currentTime = 0;
        winSound.play(); 

    }

    else {

        computerScore++;

        result = "😢 Computer Wins";

        loseSound.currentTime = 0;
        loseSound.play();
    }

    round++;

    updateScoreBoard();

    resultText.innerHTML = `
        <h2>${result}</h2>

        <p>
            <strong>${playerName}</strong> chose
            <strong>${playerChoice}</strong>
        </p>

        <p>
            Computer chose
            <strong>${computerChoice}</strong>
        </p>
    `;

    addHistory(playerChoice, computerChoice, result);

    if (round === maxRounds) {

        finishMatch();

    }

}

// ==============================
// UPDATE SCOREBOARD
// ==============================

function updateScoreBoard() {

    playerScoreText.textContent = playerScore;

    computerScoreText.textContent = computerScore;

    roundText.textContent = round;

}
// ==============================
// GAME HISTORY
// ==============================

function addHistory(playerChoice, computerChoice, result) {

    const li = document.createElement("li");

    li.innerHTML = `
        <strong>Round ${round}</strong><br>
        👤 ${playerName}: <b>${playerChoice}</b> |
        🤖 Computer: <b>${computerChoice}</b><br>
        ${result}
    `;

    historyList.prepend(li);

}

// ==============================
// FINISH MATCH
// ==============================

function finishMatch() {

    disableGameButtons();

    let message = "";

    if (playerScore > computerScore) {

    message = `🏆 Congratulations ${playerName}! You Won The Match.`;

    celebrateWin();

}

    else if (computerScore > playerScore) {

        message = "🤖 Computer Won The Match.";

    }

    else {

        message = "🤝 Match Draw.";

    }

    setTimeout(function () {

        winnerMessage.textContent = message;

        winnerModal.style.display = "flex";

    }, 500);

}
// ==============================
// RESET GAME
// ==============================

resetBtn.addEventListener("click", resetGame);

function resetGame() {

    playerName = "";
    playerScore = 0;
    computerScore = 0;
    round = 0;

    playerNameInput.value = "";

    updateScoreBoard();

    historyList.innerHTML = "";

    resultText.innerHTML = "Click Start Game";

    playerChoiceIcon.textContent = "❔";
    computerChoiceIcon.textContent = "❔";

    winnerModal.style.display = "none";

    disableGameButtons();

}

// ==============================
// DARK MODE
// ==============================

themeBtn.addEventListener("click", function () {

    document.body.classList.toggle("dark-mode");

    if (document.body.classList.contains("dark-mode")) {

        themeBtn.innerHTML = "☀️ Light Mode";

    } else {

        themeBtn.innerHTML = "🌙 Dark Mode";

    }

});

// ==============================
// HELPER FUNCTIONS
// ==============================

function enableGameButtons() {

    rockBtn.disabled = false;
    paperBtn.disabled = false;
    scissorsBtn.disabled = false;

}

function disableGameButtons() {

    rockBtn.disabled = true;
    paperBtn.disabled = true;
    scissorsBtn.disabled = true;

}
playAgainBtn.addEventListener("click", function () {

    winnerModal.style.display = "none";

    resetGame();

});
function celebrateWin() {

    confetti({

        particleCount: 180,

        spread: 90,

        origin: {

            y: 0.6

        }

    });

}