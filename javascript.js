function getComputerChoice() {
    let choice;
    const random = Math.floor(Math.random() * 3);
    if (random === 0) {
        choice = 'ROCK';
    } else if (random === 1) {
        choice = 'PAPER';
    } else {
        choice = 'SCISSORS';
    }
    return choice;
}

function playRound(playerSelection, compuerSelection) {
    playerSelection = playerSelection.toUpperCase();
    compuerSelection = compuerSelection.toUpperCase();
    let result = 0;
    if (playerSelection === compuerSelection) {
        result = 0;
    } else if (playerSelection === 'ROCK' && compuerSelection === 'SCISSORS' || playerSelection === 'SCISSORS' && compuerSelection === 'PAPER' || playerSelection === 'PAPER' && compuerSelection === 'ROCK') {
        result = 1;
    } else {
        result = -1;
    }
    printResult(result, playerSelection, compuerSelection);
    return result;
}

function printResult(result, playerSelection, compuerSelection) {
    console.log(
            result === 0
                ? "It's a tie!"
                : result === 1
                    ? `You win! ${playerSelection} beats ${compuerSelection}!`
                    : `You lose! ${compuerSelection} beats ${playerSelection}!`
    );
}

function playGame() {
    let playerSelection = "";
    let compuerSelection = "";
    let playerScore = 0;
    let computerScore = 0;
    let result = 0;
    for (let i = 0; i < 5; i++) {
        playerSelection = prompt("Rock, paper, sci~SORS!", '');
        compuerSelection = getComputerChoice();
        result = playRound(playerSelection, compuerSelection);
        if (result === 1) {
            ++playerScore;
        }
        else if (result === -1) {
            ++computerScore;
        }
        console.log(`Player score: ${playerScore} 
                     Computer score: ${computerScore}`);
    }
    return playerScore === computerScore
            ? 0
            : playerScore > computerScore
                ? 1
                : -1;
}

let result = playGame();
let resultStr = result === 0
                ? "It's a tie!"
                : result === 1
                    ? `You win!`
                    : `You lose!`;
console.log(resultStr);
