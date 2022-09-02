const Player = (icon, name, player) => {
    const getName = name; 
    const getIcon = icon;
    const score = 0;
    const displayScore = () => {
        document.getElementById(`player${player}score`).textContent = activePlayer.score;
    }
    return  {getIcon, displayScore, score, getName};
}

let player1 = '';
let player2 = '';
let activePlayer = '';

const Players = () => {
    for (let i = 1; i < 3; i++) {
        if (i === 1) {
            const player = prompt(`Player ${i}`);
            player1 = Player('X', player, '1');
        } else if (i > 1) {
            const player = prompt(`Player ${i}`);
            player2 = Player('O', player, '2');
        }
    }
    activePlayer = player1;
    return{player1, player2, activePlayer}
};

const Gameboard = (() => {
    const board = (() => {
        boardArray = Array.apply(null, Array(9));
        const boardContainer = document.querySelector('.gameboard-container');
        for (let i = 0; i < boardArray.length; i++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.id = i;
            cell.addEventListener('click', () => Gameplay.play(i));
            boardContainer.appendChild(cell);
        } 
        return {boardArray};
    })();
    const resetGame = (() => {
        const reset = document.querySelector('.resetGame');
        reset.addEventListener('click', () => {
            for (let i = 0; i < Gameboard.boardArray.length; i++) {
                Gameboard.boardArray[i] = undefined;
                document.getElementById(i).textContent = '';
            }
        })
    })();
    return {board, boardArray, resetGame};
})();

const Gameplay = (() => {
    const play = (cellId) => {
        const cell = document.getElementById(`${cellId}`);
        const gb = Gameboard.boardArray;
        if (gb[cellId] === undefined) {
            cell.textContent = activePlayer.getIcon;
            gb[cellId] = activePlayer.getIcon;
            
            if (
                gb[0] && gb[1] && gb[2] && gb[0] === gb[1] && gb[0] === gb[2] ||
                gb[3] && gb[4] && gb[5] && gb[3] === gb[4] && gb[3] === gb[5] ||
                gb[6] && gb[7] && gb[8] && gb[6] === gb[7] && gb[6] === gb[8] ||
                gb[0] && gb[3] && gb[6] && gb[0] === gb[3] && gb[0] === gb[6] ||
                gb[1] && gb[4] && gb[7] && gb[1] === gb[4] && gb[1] === gb[7] ||
                gb[2] && gb[5] && gb[8] && gb[2] === gb[5] && gb[2] === gb[8] ||
                gb[0] && gb[4] && gb[8] && gb[0] === gb[4] && gb[0] === gb[8] ||
                gb[6] && gb[4] && gb[2] && gb[6] === gb[4] && gb[6] === gb[2]
            ) {
                activePlayer.score++;
                activePlayer.displayScore();
                setTimeout(() => {
                    alert(`${activePlayer.getName} ${activePlayer.getIcon} wins`);
                }, 0);
                
                for (let i = 0; i < gb.length; i++) {
                    if (gb[i] === undefined) {
                        gb[i] = 'gameover';
                    }    
                }     
            }
            else if (activePlayer === player1) {
                activePlayer = player2;
            } else if (activePlayer === player2) {
                activePlayer = player1;
            } else activePlayer = null;
        }
    };
    const newPlayers = (() => {
        const newGame = document.querySelector('.newGame');
        newGame.addEventListener('click', () => {
            Players();
        })
    })();
    return {play, newPlayers};
})();
