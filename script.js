const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
const restartBtn = document.getElementById("restart");

let currentPlayer = "X";
let gameBoard = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;

const winConditions = [
  //rows
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  //columns
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  //diagonals
  [0, 4, 8],
  [2, 4, 6],
];

startGame();

function startGame() {
  cells.forEach((cell) => cell.addEventListener("click", handleCellClick));
  restartBtn.addEventListener("click", restartGame);
  statusText.textContent = `Player ${currentPlayer}'s turn`;
}
function handleCellClick(e) {
  const cell = e.target;
  const index = cell.getAttribute("data-index");
  if (gameBoard[index] !== "" || !gameActive) return;
  gameBoard[index] = currentPlayer;
  cell.textContent = currentPlayer;
  cell.classList.add(currentPlayer === "X" ? "x-color" : "o-color");
  checkWinner();
}
function checkWinner() {
  let roundWon = false;
  for (let condition of winConditions) {
    let [a, b, c] = condition;
    if (
      gameBoard[a] !== "" &&
      gameBoard[a] === gameBoard[b] &&
      gameBoard[b] === gameBoard[c]
    ) {
      roundWon = true;
      break;
    }
  }
  if (roundWon) {
    statusText.textContent = `Player ${currentPlayer} Wins !!!`;
    gameActive = false;
    return;
  }
  if (!gameBoard.includes("")) {
    statusText.textContent = "It's a draw?!?!";
    gameActive = false;
    return;
  }
  currentPlayer = currentPlayer === "X" ? "O" : "X";
  statusText.textContent = `Player ${currentPlayer}'s turn`;
}
function restartGame() {
  currentPlayer = "X";
  gameBoard = ["", "", "", "", "", "", "", "", ""];
  gameActive = true;
  statusText.textContent = `Player ${currentPlayer}'s turn`;

  cells.forEach((cell) => {
    cell.textContent = "";
  });
}
