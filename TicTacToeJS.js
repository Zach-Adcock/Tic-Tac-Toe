

//Create gameboard object
const gameBoard = ( () => {
    const boardMoves = ['X','X','X','X','X','X','X','X','X',];

    const eventListeners = () => {
        const gameSquares = document.querySelectorAll('.gamesquare');
        gameSquares.forEach(square => {
            square.addEventListener('click', gameBoard )
        })
    } 

    const getSelection = (e, player) => {
        if (e.innerText !== '') return
        
    };


    //Updates DOM based on player's move
    const makeMove = (squareID, choice) => {
        const checkID = parseInt(squareID[squareID.length-1]);
        if (checkID < 1 || checkID > 9) return
        if (choice == 'x') {
            document.getElementById(`#${squareID}`).innerText = 'X';
        } else if (choice == 'o') {
            document.getElementById(`#${squareID}`).innerText = 'O';
        };
    };


    return {
        boardMoves,
        makeMove,
        getSelection
    };

})();

const boardRender = ( (boardMoves) => {
    const gameSquares = document.querySelectorAll('.gamesquare');

    var count = 0;
    const render = (boardMoves) => {
        gameSquares.forEach( square => {
            square.innerText = boardMoves[count];
            count ++ ;
        });
    };

    return {
        render
        };

})();

const game = (pName) => {

    const makeMove()

}


const playerOne = player('pOne');
const playerTwo = player('pTwo');
const playerComp = player('comp');



const moves = gameBoard.boardMoves
boardRender.render(moves); 

//Add event listeners to squares
const 