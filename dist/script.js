const humanScoreEl = document.getElementById("humanScore");
const skynetScoreEl = document.getElementById("skynetScore");
const humanWrapper = document.getElementById("human");
const skynetWrapper = document.getElementById("skynet");
const allGameIcons = document.querySelectorAll(".choice");
const resultText = document.getElementById("resultText");

const choices = {
  rock: { name: "Rock", defeats: ["scissors", "lizard"] },
  paper: { name: "Paper", defeats: ["rock", "spock"] },
  scissors: { name: "Scissors", defeats: ["paper", "lizard"] },
  lizard: { name: "Lizard", defeats: ["paper", "spock"] },
  spock: { name: "Spock", defeats: ["scissors", "rock"] }
};

let humanScoreNumber = 0;
let skynetScoreNumber = 0;
let skynetChoice = "";

// Reset all 'selected' icons and classes
function resetSelected() {
  allGameIcons.forEach((icon) => {
    icon.classList.remove("selected");
    icon.classList.remove("winner");
  });
  humanWrapper.classList.remove("active");
  skynetWrapper.classList.remove("active");
  resultText.textContent = "";
}

// Reset score & humanChoice/skynetChoice
function resetAll() {
  humanScoreNumber = 0;
  skynetScoreNumber = 0;
  humanScoreEl.textContent = humanScoreNumber;
  skynetScoreEl.textContent = skynetScoreNumber;
  resetSelected();
}
window.resetAll = resetAll;

// Play Again function without resetting the score
function playAgain() {
  resetSelected();
}
window.playAgain = playAgain;

// Random skynet choice
function skynetRandomChoice() {
  const skynetChoiceNumber = Math.random();
  if (skynetChoiceNumber < 0.2) {
    skynetChoice = "rock";
  } else if (skynetChoiceNumber <= 0.4) {
    skynetChoice = "paper";
  } else if (skynetChoiceNumber <= 0.6) {
    skynetChoice = "scissors";
  } else if (skynetChoiceNumber <= 0.8) {
    skynetChoice = "lizard";
  } else {
    skynetChoice = "spock";
  }
}

// Add 'selected' styling & skynetChoice
function displaySkynetChoice() {
  const choiceElement = document.getElementById(
    `skynet${capitalizeFirstLetter(skynetChoice)}`
  );
  choiceElement.classList.add("selected");
}

// Capitalize the first letter of the string
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

// Check result, increase scores, update resultText
function updateScore(humanChoice) {
  if (humanChoice === skynetChoice) {
    resultText.textContent = "It's a tie.";
  } else {
    const choice = choices[humanChoice];
    if (choice.defeats.indexOf(skynetChoice) > -1) {
      resultText.textContent = "You Won!";
      document
        .getElementById(`human${capitalizeFirstLetter(humanChoice)}`)
        .classList.add("winner");
      humanScoreNumber++;
      humanScoreEl.textContent = humanScoreNumber;
    } else {
      resultText.textContent = "You Lost!";
      document
        .getElementById(`skynet${capitalizeFirstLetter(skynetChoice)}`)
        .classList.add("winner");
      skynetScoreNumber++;
      skynetScoreEl.textContent = skynetScoreNumber;
    }
  }
}

// Call functions to process turn
function checkResult(humanChoice) {
  resetSelected();
  skynetRandomChoice();
  displaySkynetChoice();
  updateScore(humanChoice);
}

// Passing player selection value and styling icons
function select(humanChoice) {
  checkResult(humanChoice);
  const humanChoiceElement = document.getElementById(
    `human${capitalizeFirstLetter(humanChoice)}`
  );
  humanChoiceElement.classList.add("selected");
  humanWrapper.classList.add("active");
  skynetWrapper.classList.add("active");
}
window.select = select;

// On startup, set initial values
resetAll();