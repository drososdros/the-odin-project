type GetWinner = {
  winner: boolean
  playerSymbol: string
  gameOver: boolean
}

type Player = {
  name: string
  symbol: string
  getScore: () => number
  increaseScore: () => void
  resetScore: () => void
}

type Board = {
  isEmptyIndex: (index: number) => boolean;
  getBoard: () => string[]
  setValue: (index: number, symbol: string) => void
  resetBoard: () => void
}

type Game = {
  playRound: (index: number) => undefined | string
  getBoard: Board["getBoard"]
  playersScore: () => { player1: number, player2: number }
  resetGame: () => void
  changeName: (oldName: string, newName: string) => void

}




const getWinner: (board: string[]) => GetWinner = function(board): GetWinner {
  const winnerCombinations: number[][] = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], //columns
    [0, 4, 8], [6, 4, 2]//diagonal
  ]
  for (const comb of winnerCombinations) {
    const [a, b, c] = comb
    if (board[a] !== "" && (
      board[a] === board[b] && board[b] === board[c]
    )) {
      return { winner: true, playerSymbol: board[a], gameOver: false }
    }
  }

  if (board.indexOf("") === -1) {
    return { winner: false, playerSymbol: "", gameOver: true }

  }
  return { winner: false, playerSymbol: "", gameOver: false }

}


const createPlayer: (name: string, symbol: string) => Player = function(name, symbol): Player {
  let score = 0

  const getScore = () => {
    return score
  }
  const increaseScore = () => score++;
  function resetScore() { score = 0 }

  return { name, symbol, increaseScore, getScore, resetScore }
}


function createBoard(): Board {
  const board = ["", "", "", "", "", "", "", "", ""]
  const getBoard = () => board
  const isEmptyIndex = function(index: number) { return board[index] === "" }
  const setValue = (index: number, symbol: string) => board[index] = symbol
  const resetBoard = () => board.map((_, index) => { board[index] = "" })
  return { isEmptyIndex, getBoard, setValue, resetBoard }
}


function createGame(): Game {
  const players: [Player, Player] = [createPlayer("Player 1", "X"), createPlayer("Player 2", "O")]

  let currentPlayer: Player = players[0]
  const nextPlayer = () => currentPlayer.symbol === "X" ? currentPlayer = players[1] : currentPlayer = players[0]

  const board = createBoard()
  const getBoard = board.getBoard
  const playersScore = () => {
    return {

      player1: players[0].getScore(),
      player2: players[1].getScore()
    }
  }
  function resetGame() {

    board.resetBoard()
    for (const player of players) {
      player.resetScore()
    }
  }
  function changeName(oldName: string, newName: string) {
    const playerIndex = players.findIndex(player => player.symbol === oldName)
    const player = players[playerIndex]
    player.name = newName

  }

  const playRound: Game["playRound"] = (index: number) => {

    if (!board.isEmptyIndex(index)) {
      return
    }

    board.setValue(index, currentPlayer.symbol)
    const winner = getWinner(board.getBoard())
    if (winner.winner) {
      const playerIndex = players.findIndex(player => player.symbol === winner.playerSymbol)
      const player = players[playerIndex]

      player.increaseScore()

      board.resetBoard()
      currentPlayer = player
      return `${player.symbol} wins!`
    } else if (winner.gameOver) {
      board.resetBoard()
      return "X O Draw"
    } else {
      nextPlayer()
      return
    }
  }

  return { playRound, getBoard, playersScore, resetGame, changeName }

}

function playOnDom() {
  const game = createGame()
  const gameBoard = document.querySelector(".gameboard")!
  const winn = document.querySelector(".winner")!
  function resetGame() {
    game.resetGame()
    createDom()
  }
  winn.addEventListener("click", () => {
    winn.classList.toggle("display-none")
  })

  function createDom() {
    const playerOne = document.getElementById("X")!
    const playerTwo = document.getElementById("O")!

    playerOne.textContent = game.playersScore().player1.toString()
    playerTwo.textContent = game.playersScore().player2.toString()

    gameBoard.innerHTML = ""
    game.getBoard().map((value, index) => {

      const elem = document.createElement("button")
      elem.textContent = value
      elem.id = index.toString()
      if (value === "O") {
        elem.classList.add("white")
      }
      gameBoard.appendChild(elem)
    })
  }

  gameBoard.addEventListener("click", (e) => {
    const button = e.target as HTMLElement

    if (button.id !== "") {
      const winner = game.playRound(parseInt(button.id))
      if (winner) {
        const firsChild = winn.firstChild!
        firsChild.textContent = winner.toString()
        winn.classList.toggle("display-none")


      }
      createDom()

    }

  })


  return { createDom, resetGame }



}
const game = playOnDom()
game.createDom()

//







/* this is how the board render
  0 1 2
  3 4 5
  6 7 8
*/




