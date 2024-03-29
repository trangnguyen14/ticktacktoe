document.addEventListener('DOMContentLoaded', () => {
    const grid = document.getElementById('grid');
    const restartBtn = document.getElementById('restartBtn');
    const modeSelector = document.getElementById('modeSelector');
    let currentPlayer = 'X';
    let gameBoard = ['', '', '', '', '', '', '', '', ''];
    let gameOver = false;
    let mode = 'person'; // Default mode is person vs. person

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
                    if (mode === 'person') {
                        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
                    } else {
                        if (!gameOver) {
                            computerMove();
                        }
                    }
                }
            });
            grid.appendChild(btn);
        }
    }

    // Function to make computer move
    function computerMove() {
        let availableMoves = gameBoard.map((val, index) => val === '' ? index : '').filter(String);
        let randomMove = availableMoves[Math.floor(Math.random() * availableMoves.length)];
        gameBoard[randomMove] = 'O';
        document.querySelectorAll('.grid-btn')[randomMove].textContent = 'O';
        checkWinner();
        currentPlayer = 'X';
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

    // Function to change game mode
    function changeMode() {
        mode = modeSelector.value;
        restartGame();
    }

    // Event listeners
    restartBtn.addEventListener('click', restartGame);
    modeSelector.addEventListener('change', changeMode);

    // Initialize the game
    createGridButtons();
});
