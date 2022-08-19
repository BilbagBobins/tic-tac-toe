const Gameplay = (cellId) => {
        const cell = document.getElementById(`${cellId}`);
        let winner = 0;
        if (cell.textContent === '') {
            cell.textContent = activePlayer.getIcon;
            Gameboard[cellId] = activePlayer.getIcon;
            
            const g = Gameboard;
            if (
                g[0] && g[1] && g[2] && g[0] === g[1] && g[0] === g[2] ||
                g[3] && g[4] && g[5] && g[3] === g[4] && g[3] === g[5] ||
                g[6] && g[7] && g[8] && g[6] === g[7] && g[6] === g[8] ||
                g[0] && g[3] && g[6] && g[0] === g[3] && g[0] === g[6] ||
                g[1] && g[4] && g[7] && g[1] === g[4] && g[1] === g[7] ||
                g[2] && g[5] && g[8] && g[2] === g[5] && g[2] === g[8] ||
                g[0] && g[4] && g[8] && g[0] === g[4] && g[0] === g[8] ||
                g[6] && g[4] && g[2] && g[6] === g[4] && g[6] === g[2]
            ) {
                winner = activePlayer.getName;
                console.log(winner, 'wins');
                activePlayer = null;
            }
            if (activePlayer === player1) {
                activePlayer = player2;
            } else if (activePlayer === player2) {
                activePlayer = player1;
            } else activePlayer = null;
        }
    return winner;
}

const Player = (icon, name) => {
    const getName = name; 
    const getIcon = icon;
    const score = 0;
    return  {
        getIcon,
        score,
        getName
    };
}
const player1 = Player('X', 'Jeff');
const player2 = Player('O', 'Gary');
let activePlayer = player1;


// create a player factory inside player module that runs when page loads
// player name, vs comp?, etc

//figure out how to end a game

const Players = () => {

}

const Gameboard = (() => {
    const board = Array.apply(null, Array(9));
    const boardContainer = document.querySelector('.gameboard-container');
    for (let i = 0; i < board.length; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.setAttribute('id', i);
        cell.addEventListener('click', () => Gameplay(i));
        boardContainer.appendChild(cell);
    }   
    return board;
})();
