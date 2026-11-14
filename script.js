
const choiceButtons = document.querySelectorAll(".choice-btn");

const playerChoiceDisplay = document.getElementById("player-choice");
const computerChoiceDisplay = document.getElementById("computer-choice");
const resultMessage = document.getElementById("result-message");

const playerScoreDisplay = document.getElementById("player-score");
const computerScoreDisplay = document.getElementById("computer-score");

const resetButton = document.getElementById("reset-btn");
const matchStatus = document.getElementById("match-status");
const gameContainer = document.querySelector(".game-container");

const choices = ["rock", "paper", "scissors"];

const emojis = {
  rock: "✊",
  paper: "✋",
  scissors: "✌️"
};

const winningScore = 3;

let playerScore = 0;
let computerScore = 0;
let gameFinished = false;

function playGame(playerChoice) {

  if (gameFinished) return;

  const computerChoice =
    choices[Math.floor(Math.random() * choices.length)];

  playerChoiceDisplay.textContent =
    `Your choice: ${emojis[playerChoice]} ${playerChoice}`;

  computerChoiceDisplay.textContent =
    `Computer's choice: ${emojis[computerChoice]} ${computerChoice}`;

  resultMessage.classList.remove(
    "win", "lose", "draw", "champion"
  );

  if (playerChoice === computerChoice) {

    resultMessage.textContent = "It's a Draw! 🤝";
    resultMessage.classList.add("draw");

  } else if (
    (playerChoice === "rock" && computerChoice === "scissors") ||
    (playerChoice === "paper" && computerChoice === "rock") ||
    (playerChoice === "scissors" && computerChoice === "paper")
  ) {

    playerScore++;
    resultMessage.textContent = "You win this round! 🎉";
    resultMessage.classList.add("win");

  } else {

    computerScore++;
    resultMessage.textContent = "Computer wins this round! 🤖";
    resultMessage.classList.add("lose");

  }

  playerScoreDisplay.textContent = playerScore;
  computerScoreDisplay.textContent = computerScore;

  checkChampion();
}

function checkChampion() {

  if (playerScore === winningScore) {

    resultMessage.textContent = "🏆 YOU ARE THE CHAMPION!";
    resultMessage.classList.remove("win");
    resultMessage.classList.add("champion");

    matchStatus.textContent = "🎉 Championship won!";
    gameFinished = true;

  } else if (computerScore === winningScore) {

    resultMessage.textContent = "🤖 COMPUTER IS THE CHAMPION!";
    resultMessage.classList.remove("lose");
    resultMessage.classList.add("champion");

    matchStatus.textContent = "Computer wins the championship!";
    gameFinished = true;

  } else {

    matchStatus.textContent =
      `🏆 Best of 5 | First to 3 wins | You: ${playerScore} - Computer: ${computerScore}`;

  }

  if (gameFinished) {
    gameContainer.classList.add("finished");
    choiceButtons.forEach(button => {
      button.disabled = true;
    });
  }
}

choiceButtons.forEach(button => {

  button.addEventListener("click", () => {

    playGame(button.dataset.choice);

  });

});

resetButton.addEventListener("click", () => {

  playerScore = 0;
  computerScore = 0;
  gameFinished = false;

  playerScoreDisplay.textContent = 0;
  computerScoreDisplay.textContent = 0;

  playerChoiceDisplay.textContent = "Your choice: -";
  computerChoiceDisplay.textContent = "Computer's choice: -";

  resultMessage.textContent = "Make your move!";

  resultMessage.classList.remove(
    "win", "lose", "draw", "champion"
  );

  matchStatus.textContent = "🏆 Best of 5 Championship";

  gameContainer.classList.remove("finished");

  choiceButtons.forEach(button => {
    button.disabled = false;
  });

});
