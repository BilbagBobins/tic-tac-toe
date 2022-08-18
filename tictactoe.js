function playerMove() {
    if (this.textContent == '') {
        this.textContent = 'X';
        Gameboard[this.id] = 'X';
    } 
}


const Player = () => {
    const playerToken = 'X';
    return  playerToken;
}

const Gameboard = (() => {
    const board = Array.apply(null, Array(9));
    const boardContainer = document.querySelector('.gameboard-container');
    for (let i = 0; i < board.length; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.setAttribute('id', i);
        cell.addEventListener('click', playerMove);
        boardContainer.appendChild(cell);
    }   
    return board;
})();
