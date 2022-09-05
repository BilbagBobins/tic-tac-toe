const Player = (icon, name, number) => {
    const getName = name; 
    const getIcon = icon;
    const score = 0;
    return  {getIcon, getName, score};
}

const Gameboard = (() => {
    let player1 = '';
    let player2 = '';
    let activePlayer = '';
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
    const resetBoard = () => {
        for (let i = 0; i < Gameboard.boardArray.length; i++) {
            Gameboard.boardArray[i] = undefined;
            document.getElementById(i).textContent = '';
        }
    };
    const displayScores = () => {
        document.getElementById('player1score').textContent = Gameboard.player1.score;
        document.getElementById('player2score').textContent = Gameboard.player2.score;
    }
    document.querySelector('.newMatch').addEventListener('click', () => resetBoard())
    
    document.querySelector('.newPlayers').addEventListener('click', () => {
        for (let i = 1; i < 3; i++) {
            if (i === 1) {
                const playerName = prompt(`Player ${i}`);
                Gameboard.player1 = Player('X', playerName, i);
                document.getElementById('player1Name').textContent = playerName + ': ';
            } else if (i > 1) {
                const playerName = prompt(`Player ${i}`);
                Gameboard.player2 = Player('O', playerName, i);
                document.getElementById('player2Name').textContent = playerName + ': ';
            }
        }
        resetBoard();
        Gameboard.player1.score = Gameboard.player2.score = 0;
        displayScores();

        document.querySelector('.scores-container').style.visibility = 'visible';
        Gameboard.activePlayer = Gameboard.player1;
    })
    return {player1, player2, activePlayer, boardArray, displayScores};
})();

const Gameplay = (() => {
    const play = (cellId) => {
        const cell = document.getElementById(`${cellId}`);
        const gb = Gameboard.boardArray;
        if (gb[cellId] === undefined) {
            cell.textContent = Gameboard.activePlayer.getIcon;
            gb[cellId] = Gameboard.activePlayer.getIcon;
            
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
                Gameboard.activePlayer.score++;
                Gameboard.displayScores();
                setTimeout(() => {
                    alert(`${Gameboard.activePlayer.getName} ${Gameboard.activePlayer.getIcon} wins`);
                }, 0);
                
                for (let i = 0; i < gb.length; i++) {
                    if (gb[i] === undefined) {
                        gb[i] = 'gameover';
                    }    
                } 
                document.querySelector('.newMatch').style.visibility = 'visible';
                return;
            } else if (Gameboard.activePlayer === Gameboard.player1) {
                Gameboard.activePlayer = Gameboard.player2;
            } else if (Gameboard.activePlayer === Gameboard.player2) {
                Gameboard.activePlayer = Gameboard.player1;
            } else Gameboard.activePlayer = null;
            let count = 0;
            for (i = 0; i < gb.length; i++) {
                if (gb[i] !== undefined) {
                    count++;
                }
                if (count === 9) {
                    setTimeout(() => {
                        alert('It\'s a draw');
                        document.querySelector('.newMatch').style.visibility = 'visible';
                    }, 0);
                }
            }
        }
    };
    
    return {play};
})();
