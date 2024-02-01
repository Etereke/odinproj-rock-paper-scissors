const CHOICE_INVALID = -1;
const CHOICE_ROCK = 0;
const CHOICE_PAPER = 1;
const CHOICE_SCISSORS = 2;
const IMAGE_ROCK = './img/rock.jpg';
const IMAGE_PAPER = './img/paper.jpg';
const IMAGE_SCISSORS = './img/scissors.jpg';
const IMAGE_JANKEN = './img/janken.svg';
const ROUND_INIT = -2;
const ROUND_TIE = 0;
const ROUND_PLAYERWON = 1;
const ROUND_COMPUTERWON = -1;

let playerChoice = CHOICE_INVALID;
let computerChoice = CHOICE_INVALID;
let roundResult = ROUND_INIT;
let playerScore = 0;
let computerScore = 0;
let roundResultText = 'Choose your weapon!';
let gameResultText = '';

const btnContainer = document.querySelector('.btn-container');
const gameBtns = document.querySelectorAll('.btn-container > button');
const restartBtn = document.querySelector('.btn-restart');
const computerChoiceImg = document.querySelector('#computerChoice');
const playerChoiceImg = document.querySelector('#playerChoice');
const computerScoreSpan = document.querySelector('#computerScore');
const playerScoreSpan = document.querySelector('#playerScore');
const roundResultDiv = document.querySelector('.result-round');
const gameResultDiv = document.querySelector('.result-game');

initialize();

function initialize () {
    playerChoice = CHOICE_INVALID;
    computerChoice = CHOICE_INVALID;
    roundResult = ROUND_INIT;
    playerScore = 0;
    computerScore = 0;
    roundResultText = 'Choose your hand!';
    gameResultText = '';
    updateUI();

    restartBtn.addEventListener('click', handleRestart);
    btnContainer.addEventListener('click', handlePlayerChoice);
}

/* EVENT HANDLERS */
function handlePlayerChoice(e) {
    const target = e.target;
    switch(target.id) {
        case 'rock':
            playerChoice = CHOICE_ROCK;
            break;
        case 'paper':
            playerChoice = CHOICE_PAPER;
            break;
        case 'scissors':
            playerChoice = CHOICE_SCISSORS;
            break;
        default:
            playerChoice = CHOICE_INVALID;
    }
    playRound();
}

function handleRestart(event) {
    initialize();
    gameBtns.forEach((button) => {
        button.toggleAttribute('disabled');
    });
    restartBtn.classList.toggle('hidden');
}

function handleGameOver(isWon) {
    restartBtn.classList.toggle('hidden');
    gameResultText = isWon
        ? 'Congratulations! You beat the computer!'
        : 'Game over! Better luck next time!';
    gameBtns.forEach((button) => {
        button.toggleAttribute('disabled');
    });
    updateUI();
}

/* GAMEPLAY-RELATED AND UI FUNCTIONS */
function playRound() {
    computerChoice = getComputerChoice();
    roundResult = resolveRound(playerChoice, computerChoice);
    updateRoundResultText();

    if (roundResult === ROUND_PLAYERWON) {
        playerScore++;
    } else if (roundResult === ROUND_COMPUTERWON) {
        computerScore++;
    }

    if (playerScore >= 5) {
        handleGameOver(1);
    } else if (computerScore >= 5) {
        handleGameOver(0);
    } else {
        updateUI();
    }
}

function updateUI() {
    computerScoreSpan.textContent = computerScore;
    playerScoreSpan.textContent = playerScore;
    roundResultDiv.textContent = roundResultText;
    gameResultDiv.textContent = gameResultText;
    computerChoiceImg.setAttribute('src', getImageSrc(computerChoice));
    playerChoiceImg.setAttribute('src', getImageSrc(playerChoice));
    updateImageBorders();
}

function updateImageBorders() {
    switch(roundResult) {
        case 1:
            computerChoiceImg.classList.remove('winner');
            computerChoiceImg.classList.add('loser');
            playerChoiceImg.classList.remove('loser');
            playerChoiceImg.classList.add('winner');
            break;
        case -1:
            computerChoiceImg.classList.remove('loser');
            computerChoiceImg.classList.add('winner');
            playerChoiceImg.classList.remove('winner');
            playerChoiceImg.classList.add('loser');
            break;
        default:
            roundResultText = `Choose your hand!`;
            computerChoiceImg.classList.remove('winner', 'loser');
            playerChoiceImg.classList.remove('winner', 'loser');
    }
}

function updateRoundResultText() {
    switch(roundResult) {
        case 0:
            roundResultText = "It's a tie!";
            break;
        case 1:
            roundResultText = `You win! ${capitalizeFirstLetter(getRoundResultText(playerChoice))} beats ${getRoundResultText(computerChoice)}!`;
            break;
        case -1:
            roundResultText = `You lose! ${capitalizeFirstLetter(getRoundResultText(playerChoice))} loses to ${getRoundResultText(computerChoice)}!`;
            break;
        default:
            roundResultText = `Choose your hand!`;
    }
}

function resolveRound(playerChoice, computerChoice) {
    if (playerChoice === computerChoice) {
        return ROUND_TIE;
    } else if (playerChoice === CHOICE_ROCK && computerChoice === CHOICE_SCISSORS 
            || playerChoice === CHOICE_SCISSORS && computerChoice === CHOICE_PAPER 
            || playerChoice === CHOICE_PAPER && computerChoice === CHOICE_ROCK) {
        return ROUND_PLAYERWON;
    } else {
        return ROUND_COMPUTERWON;
    }
}

/* HELPER FUNCTIONS */
function getComputerChoice() {
    return Math.floor(Math.random() * 3);
}

function getRoundResultText(choice) {
    return choice === CHOICE_ROCK
            ? 'rock'
            : choice === CHOICE_PAPER
                ? 'paper'
                : 'scissors';
}

function getImageSrc(choice) {
    return choice === CHOICE_ROCK
            ? IMAGE_ROCK
            : choice === CHOICE_PAPER
                ? IMAGE_PAPER
                : choice === CHOICE_SCISSORS
                    ? IMAGE_SCISSORS
                    : IMAGE_JANKEN;
}

function capitalizeFirstLetter(str) {
    return str[0].toUpperCase() + str.slice(1);
}