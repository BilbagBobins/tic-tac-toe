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
    let winner = player1;
    document.querySelector('.scores-container').style.visibility = 'hidden';

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
        Gameplay.winner.textContent = '';
        if (!Gameplay.gameover) {
            Gameboard.activePlayer = Gameboard.winner;
        }
        Gameplay.gameover = false;
        for (let i = 0; i < Gameboard.boardArray.length; i++) {
            Gameboard.boardArray[i] = undefined;
            document.getElementById(i).textContent = '';
        }
        if (GameSetup.computer) {
            if (Gameboard.activePlayer === Gameboard.player2) {
                Gameplay.ComputerPlay();
            }
        }
    };
    const displayScores = () => {
        document.getElementById('player1score').textContent = Gameboard.player1.score;
        document.getElementById('player2score').textContent = Gameboard.player2.score;
    }
    
    const playerNames = (event) => {
        event.preventDefault();
        let player1Name = document.getElementById('name1').value;
        if (!player1Name) {
            player1Name = 'Player 1';
        }
        Gameboard.player1 = Player('X', player1Name, 1);
        if (Gameboard.player1.getName) {
            document.getElementById('player1Name').textContent = player1Name + ': ';
        }

        let player2Name = document.getElementById('name2').value;
        if (!player2Name) {
            player2Name = 'Player 2';
        }
        Gameboard.player2 = Player('O', player2Name, 2);
        if (Gameboard.player2.getName) {
            document.getElementById('player2Name').textContent = player2Name + ': ';
        }
        
        GameSetup.name2p.style.visibility = 'hidden';
        
        GameSetup.game.style.visibility = 'visible';
        resetBoard();
        Gameboard.player1.score = Gameboard.player2.score = 0;
        displayScores();   
        document.querySelector('.scores-container').style.visibility = 'visible';
        Gameboard.activePlayer = Gameboard.player1;     
    }

    const singlePlayerName = (event) => {
        event.preventDefault();
        let playerName = document.getElementById('1pname1').value;
        if (!playerName) {
            playerName = 'Human'
        }
        Gameboard.player1 = Player('X', playerName, 1);
        Gameboard.player2 = Player('O', 'Computer', 2);
        document.getElementById('player1Name').textContent = playerName + ': ';
        document.getElementById('player2Name').textContent = 'Computer: ';

        GameSetup.name1p.style.visibility = 'hidden';
        GameSetup.game.style.visibility = 'visible';
        resetBoard();
        Gameboard.player1.score = Gameboard.player2.score = 0;
        displayScores();   
        document.querySelector('.scores-container').style.visibility = 'visible';
        Gameboard.activePlayer = Gameboard.player1; 
    }


    document.querySelector('.newMatch').addEventListener('click', () => resetBoard())
    document.querySelector('.newMatch').style.visibility = 'hidden';

    document.querySelector('.newPlayers').addEventListener('click', () => {
        location.reload();
        return false;
    })
    return {player1, player2, activePlayer, winner, boardArray, displayScores, playerNames, singlePlayerName};
})();

const Gameplay = (() => {
    let gameover = false;
    const winner = document.querySelector('.winner');
    const play = (cellId) => {
        const cell = document.getElementById(`${cellId}`);
        const gb = Gameboard.boardArray;
         
        if (gb[cellId] === undefined) {
            cell.textContent = Gameboard.activePlayer.getIcon;
            gb[cellId] = Gameboard.activePlayer.getIcon;
            move();
            if (!Gameplay.gameover) {
                ComputerPlay();
            }
        }  
    };

    const ComputerPlay = () => {
        const gb = Gameboard.boardArray;
        setTimeout(() => {
            if (!Gameplay.gameover) {
                if (GameSetup.computer) {
                    let randomNum = '';
                    do {
                        randomNum = Math.floor(Math.random() * 9);
                    } while (gb[randomNum] !== undefined && gb[randomNum] !== 'gameover');
                    document.getElementById(randomNum).textContent = Gameboard.activePlayer.getIcon;
                    gb[randomNum] = Gameboard.activePlayer.getIcon;
                    move();
                }
            }
        }, 500);
    }

    const swapPlayers = () => {
        if (Gameboard.activePlayer === Gameboard.player1) {
            Gameboard.activePlayer = Gameboard.player2;
        } else if (Gameboard.activePlayer === Gameboard.player2) {
            Gameboard.activePlayer = Gameboard.player1;
        } else Gameboard.activePlayer = '';
    }

    const move = () => {
        const gb = Gameboard.boardArray;
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
            Gameboard.winner = Gameboard.activePlayer;
            setTimeout(() => {
                winner.textContent = `${Gameboard.activePlayer.getName} ${Gameboard.activePlayer.getIcon} wins`;
            }, 10);
            
            for (let i = 0; i < gb.length; i++) {
                if (gb[i] === undefined) {
                    gb[i] = 'gameover';
                }    
            } 
            document.querySelector('.newMatch').style.visibility = 'visible';
            Gameplay.gameover = true;
            return;
        } else swapPlayers();
        
        let count = 0;
        for (i = 0; i < gb.length; i++) {
            if (gb[i] !== undefined) {
                count++;
            }
            if (count === 9) {
                Gameplay.gameover = true;
                setTimeout(() => {
                    winner.textContent = 'It\'s a draw';
                    document.querySelector('.newMatch').style.visibility = 'visible';
                }, 0);
                for (let i = 0; i < gb.length; i++) {
                        gb[i] = 'gameover'; 
                } 
            }
        }
    }
    
    return {play, ComputerPlay, gameover, winner};
})();

const GameSetup = (() => {
    let computer = false;
    const game = document.querySelector('.gameplay-container');
    const opponent = document.querySelector('.opponent');
    const name1p = document.getElementById('onePName');
    const name2p = document.getElementById('twoPNames');

    name1p.style.visibility = 'hidden'; 
    name2p.style.visibility = 'hidden';
    game.style.visibility = 'hidden';

    document.getElementById('human').addEventListener('click', () => {
        opponent.style.visibility = 'hidden';
        name2p.style.visibility = 'visible';
        document.getElementById('name1').focus();
        document.getElementById('2pPlay').addEventListener('click', Gameboard.playerNames)
    });
    document.getElementById('computer').addEventListener('click', () => {
        GameSetup.computer = true;
        opponent.style.visibility = 'hidden';
        name1p.style.visibility = 'visible';
        document.getElementById('1pname1').focus();
        document.getElementById('1pPlay').addEventListener('click', Gameboard.singlePlayerName)
    });
    return{name1p, name2p, game, computer};
})();