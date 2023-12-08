const cellElements = document.querySelectorAll("[data-cell]");
const board = document.getElementById("board");
const menu = document.querySelector(".menu-overlay");
const startButton = document.querySelector(".action-btn");
const winningView = document.querySelector(".winner-display");
const winnerMessage = document.querySelector("[data-winner-msg]");
const restartButton = document.querySelector(".restart-btn");
const resetButton = document.querySelector(".reset-btn");
const PLAYER_X = "x";
const PLAYER_O = "circle";
let circleTurn;

const WINNING_COMBOS = [
	[0, 1, 2],
	[3, 4, 5],
	[6, 7, 8],
	[0, 3, 6],
	[1, 4, 7],
	[2, 5, 8],
	[0, 4, 8],
	[2, 4, 6],
];

function handleClick(e) {
	const cell = e.target;
	const currentClass = circleTurn ? PLAYER_O : PLAYER_X;
	placeMark(cell, currentClass);

	if (checkWin(currentClass)) {
		endGame(false);
	} else if (isDraw()) {
		endGame(true);
	} else {
		swapTurns();
		setBoardHoverClass();
	}
}

function initGame() {
	startButton.addEventListener("click", (e) => {
		winningView.style.display = "none";

		circleTurn = false;

		cellElements.forEach((cell) => {
			cell.classList.remove(PLAYER_X);
			cell.classList.remove(PLAYER_O);

			cell.removeEventListener("click", handleClick);
			cell.addEventListener("click", handleClick, { once: true });
		});

		setBoardHoverClass();

		menu.style.visibility = "hidden";
	});
}

function placeMark(cell, currentClass) {
	cell.classList.add(currentClass);
}

function swapTurns() {
	circleTurn = !circleTurn;
}

function isDraw() {
	return [...cellElements].every((cell) => {
		return (
			cell.classList.contains(PLAYER_X) || cell.classList.contains(PLAYER_O)
		);
	});
}

function setBoardHoverClass() {
	board.classList.remove(PLAYER_X);
	board.classList.remove(PLAYER_O);

	if (circleTurn) {
		board.classList.add(PLAYER_O);
	} else {
		board.classList.add(PLAYER_X);
	}
}

function restartGame() {
	winningView.style.display = "none";

	circleTurn = false;

	cellElements.forEach((cell) => {
		cell.classList.remove(PLAYER_X);
		cell.classList.remove(PLAYER_O);

		cell.removeEventListener("click", handleClick);
		cell.addEventListener("click", handleClick, { once: true });
	});

	setBoardHoverClass();
}

function checkWin(currentClass) {
	return WINNING_COMBOS.some((combination) => {
		return combination.every((index) => {
			return cellElements[index].classList.contains(currentClass);
		});
	});
}

function endGame(draw) {
	if (draw) {
		winnerMessage.innerText = "Draw!";
	} else {
		winnerMessage.innerText = circleTurn ? "O WINS!" : "X WINS!";
	}

	winningView.style.display = "flex";
}

restartButton.addEventListener("click", restartGame);
resetButton.addEventListener("click", restartGame);

initGame();
