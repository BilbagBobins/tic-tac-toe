// function playerMove() {
//     if (this.textContent === '') {
//         this.textContent = 'X';
//         Gameboard[this.id] = 'X';
//     } 
// }

const Gameplay = (id) => {
    // which active player?
    activePlayer.playerMove(id);
}

const Player = (icon) => {

    const playerMove = (id) => {
        const cell = document.getElementById(`${id}`);
        if (cell.textContent === '') {
            cell.textContent = icon;
            Gameboard[id] = icon;
            console.log(Gameboard);
        }
    }
    
    return  {
        playerMove
    }
}
const player1 = Player('X');
const player2 = Player('O');
const activePlayer = player1;
// create a player factory inside player module that runs when page loads
// player name, vs comp?, etc

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
