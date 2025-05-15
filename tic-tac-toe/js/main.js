"use strict";
const getWinner = function (board) {
    const winnerCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], //columns
        [0, 4, 8], [6, 4, 2] //diagonal
    ];
    for (const comb of winnerCombinations) {
        const [a, b, c] = comb;
        if (board[a] !== "" && (board[a] === board[b] && board[b] === board[c])) {
            return { winner: true, playerSymbol: board[a], gameOver: false };
        }
    }
    if (board.indexOf("") === -1) {
        return { winner: false, playerSymbol: "", gameOver: true };
    }
    return { winner: false, playerSymbol: "", gameOver: false };
};
const createPlayer = function (name, symbol) {
    let score = 0;
    const getScore = () => score;
    const increaseScore = () => score++;
    function resetScore() { score = 0; }
    return { name, symbol, increaseScore, getScore, resetScore };
};
function createBoard() {
    const board = ["", "", "", "", "", "", "", "", ""];
    const getBoard = () => board;
    const isEmptyIndex = function (index) { return board[index] === ""; };
    const setValue = (index, symbol) => board[index] = symbol;
    const resetBoard = () => board.map((_, index) => { board[index] = ""; });
    return { isEmptyIndex, getBoard, setValue, resetBoard };
}
function createGame() {
    const players = [createPlayer("Player 1", "X"), createPlayer("Player 2", "O")];
    let currentPlayer = players[0];
    const nextPlayer = () => currentPlayer.symbol === "X" ? currentPlayer = players[1] : currentPlayer = players[0];
    const board = createBoard();
    const getBoard = board.getBoard;
    const playersScore = { player1: players[0].getScore(), player2: players[1].getScore() };
    function resetGame() {
        board.resetBoard();
        for (const player of players) {
            player.resetScore();
        }
    }
    const playRound = (index) => {
        if (!board.isEmptyIndex(index)) {
            return;
        }
        board.setValue(index, currentPlayer.symbol);
        const winner = getWinner(board.getBoard());
        if (winner.winner) {
            const playerIndex = players.findIndex(player => player.symbol === winner.playerSymbol);
            const player = players[playerIndex];
            player.increaseScore();
            board.resetBoard();
            currentPlayer = player;
            return `${player.name} wins!`;
        }
        else if (winner.gameOver) {
            board.resetBoard();
            return "Its a Draw";
        }
        else {
            nextPlayer();
            return;
        }
    };
    return { playRound, getBoard, playersScore, resetGame };
}
function drawDom() {
}
/* this is how the board render
  0 1 2
  3 4 5
  6 7 8
*/
