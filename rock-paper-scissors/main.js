"use strict"


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

function reset() {
	const winnerPopUp = document.querySelector("#winner-box")
	const playerScore = document.querySelector("#player-score");
	const roundScore = document.querySelector(".current-score")
	const computerScore = document.querySelector("#computer-score");

	winnerPopUp.classList.remove("winner-container")
	winnerPopUp.classList.add("hidden")
	playerScore.textContent = 0
	computerScore.textContent = 0

	roundScore.textContent = ""
	roundScore.classList.remove("win", 'loose', 'draw')

}


function getGameWinner(playerScore, computerScore) {

	if (playerScore >= 5 || computerScore >= 5) {
		const winnerPopUp = document.querySelector("#winner-box")
		const winnerText = document.querySelector(".winner")
		const p = document.createElement("p")
		const pScore = document.createElement('p')
		while (winnerText.hasChildNodes()) {
			winnerText.firstChild.remove()
		}

		winnerPopUp.classList.remove("hidden")
		winnerPopUp.classList.add("winner-container")
		winnerText.classList.remove("win", "loose", "draw")
		pScore.textContent = `Score: ${playerScore}:${computerScore}`

		if (playerScore === computerScore) {

			p.textContent = "Its a draw"
			winnerText.appendChild(p)
			winnerText.appendChild(pScore)
			winnerText.classList.add("draw")


		} else if (playerScore > computerScore) {

			p.textContent = "You Win"
			winnerText.appendChild(p)
			winnerText.appendChild(pScore)
			winnerText.classList.add("win")

		} else {
			p.textContent = "Game Over"
			winnerText.appendChild(p)
			winnerText.appendChild(pScore)
			winnerText.classList.add("loose")
		}

	}
}



function playRound(playerChoice) {
	const computerChoice = getComputerChoice();
	const playerScore = document.querySelector("#player-score");
	const roundScore = document.querySelector(".current-score")
	const computerScore = document.querySelector("#computer-score");
	let playerScoreNumber = Number(playerScore.textContent);
	let computerScoreNumber = Number(computerScore.textContent);

	if (playerChoice === computerChoice) {
		playerScoreNumber++;
		computerScoreNumber++;
		playerScore.textContent = playerScoreNumber;
		computerScore.textContent = computerScoreNumber;
		roundScore.classList.remove("win", 'loose')
		roundScore.classList.add('draw')
		roundScore.textContent = "It's a Draw"

	}
	else if (playerChoice === "rock" && computerChoice === "scissor") {
		playerScoreNumber++;
		playerScore.textContent = playerScoreNumber;
		roundScore.classList.remove("draw", 'loose')
		roundScore.classList.add("win")
		roundScore.textContent = "Player wins this Round"
	} else if (playerChoice === "paper" && computerChoice === "rock") {
		playerScoreNumber++;
		playerScore.textContent = playerScoreNumber;
		roundScore.classList.remove("draw", 'loose')
		roundScore.classList.add("win")
		roundScore.textContent = "Player wins this Round"
	} else if (playerChoice === "scissor" && computerChoice === "paper") {
		playerScoreNumber++;
		playerScore.textContent = playerScoreNumber;
		roundScore.classList.remove("draw", 'loose')
		roundScore.classList.add("win")
		roundScore.textContent = "Player wins this Round"

	} else {
		computerScoreNumber++;
		computerScore.textContent = computerScoreNumber;
		roundScore.classList.remove("draw", 'win')
		roundScore.classList.add("loose")
		roundScore.textContent = "Computer wins this Round"
	}
	getGameWinner(playerScoreNumber, computerScoreNumber)


}




function main() {


	const resetBtn = document.querySelector(".winner-btn")
	resetBtn.addEventListener("click", () => {
		reset()
	})
	const playerChoice = document.querySelectorAll(".game-icons")
	for (const child of [...playerChoice]) {
		child.addEventListener("click", (e) => {
			playRound(e.target.id)

		});
	};

};

main()
