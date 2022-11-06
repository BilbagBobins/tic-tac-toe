# Tic Tac Toe

## <u>The Brief</u>
This is the Tic Tac Toe project as part of The Odin Project's Javascript course.

We were asked to make a Tic Tac Toe game that can be played in the browser.

This project followed on from the Factory Function and Module Pattern lesson so we are to incorporate those concepts in the build.

The main goal is to tuck away all of the functions into a module or a factory and have as little global code as possible.

With this in mind there are a few things we need to accomplish:

- Build a function that allows players to add marks to the game board when the DOM is clicked on. It should stop players from clicking on a spot that already has something in it.
- Build logic that checks for game over - that being 3 in a row, or a tie.
- Allow for players to enter their name.
- Buttons to start/restart the game.
- A display element to congratulate the winner.
- <u>Optional</u>: create an AI so a player can play against the computer.

## <u>Overview</u>

When the page is loaded the user is presented a simple form asking if they want to play against another human or the computer. If the user selects "2 Player" another form appears to allow input for both of the player's names. If either player does not input a name then that name defaults to either Player 1 or Player 2. The user then clicks the "Let's Play" button and the game board is revealed along with the scores and whose turn it is.

If the user were to select "vs Computer" at page load, then they will be presented with only one name field to complete and their opponent will be named Computer.

Once the names are complete the Tic Tac Toe board is revealed.

The players take turns by clicking the square on the board where they want their icon to go. Players alternate turns until a winner is produced or the game ties. The scores are updated when there's a winner and the players have the option to play again or chose new players. When a new match is started with the existing players the winner will have first turn of the new game, but if the game were a tie, then the player who went first that game will now go second.

## <u>The Build</u>


## HTML and basic layout
The basic HTML was written first. The Gameboard was the main thing that this project would revolve around and it is one of the only things that is generated with JS.

All of the opponent and player name forms as well as any headings are more or less written into the HTML. Elements like names and the scores come from the JS as the game is played.

The element containers are either hidden or revealed when the page loads and they change state as they are activated. The placement of the elements all overlap each other and if things weren't hidden or revealed dynamically then it would all look like a big mess. The overlap was achieved through the use of the Grid-row function - giving multiple elements the same row value.

## Modules, Factories and functions

All of the code has been wrapped up into 3 main modules and a factory. The modules are IIFE which means the functions are called as soon as they are created when the page loads.

Getting everything wrapped up inside of their own module or factory took a lot of trial and error. I kept getting stuck with returning the functions or return values and how to reference them within another module.

### Gameboard module
The Gameboard module holds all the code required to generate the dynamic elements on the page such as the player names and scores. It also holds the game board itself which is what the players interact with to play the Tic Tac Toe game.

#### `board()`
The values of the actual board are held in an array. The array is an IIFE and is generated on page load with 9 values, each being null. It is then represented in the DOM as 9 empty cells wrapped into a 3x3 grid, each cell having a 'click' Event Listener that calls `Gameplay.play()` on that cell.

#### `resetBoard()`
Any time the game starts, be it through new players or the new match button, `resetBoard()` is called. This function resets the gameboard variables and clears out the game board array ready for a new match. If the game is reset before the game ends it retains who the starting player was with the `activePlayer` and `Gameboard.winner` variables.

If the game being played is vs the computer the function prompts the computer to take its turn with `Gameplay.ComputerPlay()`. If the game is with 2 humans the DOM is updated with who's turn it is.

#### `playerNames()` and `singlePlayerNames()`
These two functions serve the same purpose but are called separately if the game is 2p or vs the computer. 

No matter which game is being played the process is more or less the same. The results from the player names form along with a symbol of either X or O are loaded into the `Player` factory  generating a player1 and a player2. Then the names are copied to the DOM, the form is hidden, the gameboard is revealed, the board is reset and scores are displayed.

### Gameplay module
This module has all the game mechanics. It handles the `click Eventlistener` on from the game board, the logic for swapping which player's turn it is and it checks if there's a winner by checking if there is ever 3 in a row. The computer player AI is also in here.

#### `play()`
This function is called when a cell on the board is clicked. It takes the ID of the cell and checks if there is a value in the gameboard array at the index of that ID `gb[cellId]`. If there is something in that cell nothing happens and the user is free to keep clicking until they click on an empty cell. Once an empty cell is clicked the both the cell and the gameboard array are updated with the activeplayer's icon. The `move()` function is then called and if there is no winner, the game is not over, and the opponent is the computer then `ComputerPlay()` is called.

#### `ComputerPlay()`
This is the logic for the computer AI. It is a randomly generated opponent. A `do while` loop generates a new random number between 1 and 9 representing each cell of the board. As with the human player when they click on a cell that isn't empty, the same applies to the computer and it's random number cell. The conditions for the `while` are not met so the `do` generates a new number until it gets an empty cell. Once it does that `move()` is called to check for a winner.

This is all wrapped in a `setTimeout()` to give a little bit of time and between the player taking a turn and the computer taking a turn. It gives the feeling that the computer is thinking and lets the player absorb what's going on instead of being met with an instantaneous reply to their move.

#### `move()`
This function is called after each player moves and checks if there is 3 in a row. It does that with brute force checking if there is a value in any possible combination of 3 in a row cells and then checks that combination for identical values.
If there are not 3 in a row then `swapPlayers()` is called.

If there *are* 3 in a row the winner in announced, the scores are updated, and the remaining empty gameboard array indexes are given a generic value so that the gameboard cannot be interacted with until a new game is started.

#### `swapPlayers()`
This function takes the current active player and swaps it for the other player, be it human or computer.

### GameSetup module
The GameSetup module checks if the user wants to play 2p or vs the computer. The function sets up event listeners on either option's button to call either `Gameboard.playerNames` or `Gameboard.singlePlayerNames`.

It hides or shows the names depending on which option is clicked and tells `Gameplay` if there is a computer playing.











