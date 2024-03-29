document.addEventListener('DOMContentLoaded', function () {
  const board = document.getElementById('game-board');
  const resetButton = document.getElementById('reset-btn');
  let currentPlayer = 'X';
  let gameBoard = ['', '', '', '', '', '', '', '', ''];
  let gameActive = true;

  const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  const checkWinner = () => {
    for (let condition of winningConditions) {
      const [a, b, c] = condition;
      if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
        return gameBoard[a];
      }
    }
    return null;
  };

  const handleCellClick = (e) => {
    const cell = e.target;
    const cellIndex = parseInt(cell.dataset.index);

    if (gameBoard[cellIndex] === '' && gameActive) {
      gameBoard[cellIndex] = currentPlayer;
      cell.textContent = currentPlayer;
      const winner = checkWinner();
      if (winner) {
        gameActive = false;
        alert(`Player ${winner} wins!`);
      } else if (!gameBoard.includes('')) {
        gameActive = false;
        alert("It's a draw!");
      } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
      }
    }
  };

  const resetGame = () => {
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    board.querySelectorAll('.cell').forEach(cell => {
      cell.textContent = '';
    });
    gameActive = true;
    currentPlayer = 'X';
  };

  for (let cell of board.querySelectorAll('.cell')) {
    cell.addEventListener('click', handleCellClick);
  }

  resetButton.addEventListener('click', resetGame);
});
