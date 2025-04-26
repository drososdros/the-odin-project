function getRandomInteger(min, max) {
	return Math.floor(Math.random() * (max - min) + min);
};


function getComputerChoice() {
	let number = getRandomInteger(0, 3);
	switch (number) {
		case 0:
			return "rock";
		case 1:
			return "paper";
		default:
			return "scissor";
	};
};

function getHumanChoice() {
	let choice = prompt("Enter a choice of \n'rock'\n'paper'\n'scissor'")
	return choice.toLowerCase()

}

function playRound(humanChoice, computerChoice) {
	if (humanChoice === computerChoice) {
		return "Draw"
	}
	else if (humanChoice === "rock" && computerChoice === "scissor") {
		return "Player Wins"
	} else if (humanChoice === "paper" && computerChoice === "rock") {
		return "Player Wins"
	} else if (humanChoice === "scissor" && computerChoice === "paper") {
		return "Player Wins"

	} else {
		return "Computer Wins"
	}


}
function main() {
	let computerScore = 0;
	let playerScore = 0;
	for (let i = 0; i < 5; i++) {
		const result = playRound(getHumanChoice(), getComputerChoice())
		switch (result) {
			case "Computer Wins":
				computerScore++;
				break;
			case "Player Wins":
				playerScore++;
				break;


		}
		console.log(result)
	}
	console.log("Final Score")
	if (computerScore > playerScore) {
		console.log(`Computer wins ${computerScore}:${playerScore}`)
	} else if (computerScore < playerScore) {
		console.log(`Player wins ${playerScore}:${computerScore}`)
	} else {
		console.log(`Draw ${playerScore}:${computerScore}`)
	}



}


main()
