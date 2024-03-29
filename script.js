document.addEventListener('DOMContentLoaded', () => {
    const grid = document.getElementById('grid');
    const restartBtn = document.getElementById('restartBtn');
    let currentPlayer = 'X';
    let gameBoard = ['', '', '', '', '', '', '', '', ''];
    let gameOver = false;

    // Function to create grid buttons
    function createGridButtons() {
        for (let i = 0; i < 9; i++) {
            const btn = document.createElement('button');
            btn.classList.add('grid-btn');
            btn.addEventListener('click', () => {
                if (!gameOver && gameBoard[i] === '') {
                    gameBoard[i] = currentPlayer;
                    btn.textContent = currentPlayer;
                    checkWinner();
                    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
                }
            });
            grid.appendChild(btn);
        }
    }

    // Function to check for a winner
    function checkWinner() {
        const winningCombos = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];
        for (let combo of winningCombos) {
            const [a, b, c] = combo;
            if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
                gameOver = true;
                alert(`${gameBoard[a]} wins!`);
                break;
            }
        }
        if (!gameBoard.includes('') && !gameOver) {
            gameOver = true;
            alert('It\'s a draw!');
        }
    }

    // Function to restart the game
    function restartGame() {
        grid.innerHTML = '';
        currentPlayer = 'X';
        gameBoard = ['', '', '', '', '', '', '', '', ''];
        gameOver = false;
        createGridButtons();
    }

    // Event listener for restart button
    restartBtn.addEventListener('click', restartGame);

    // Initialize the game
    createGridButtons();
});
