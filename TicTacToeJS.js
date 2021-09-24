
//Module to control HTML DOM
const displayController = ( () => {

    //Setting selector indicators
    const mainDiv = document.getElementsByClassName('main');
    const setupContainer = document.querySelector('.setup-container');
    const gameTitle = document.querySelector('.game-title');
    const playerOneTitle = document.querySelector('.player-one-title');
    const playerTwoTitle = document.querySelector('.player-two-title');
    const playerOneSelector = document.querySelector('#player-one-human-selector');
    const playerTwoSelector = document.querySelector('#player-two-human-selector');
    const AIOneSelector = document.querySelector('#player-one-AI-selector');
    const AITwoSelector = document.querySelector('#player-two-AI-selector');
    
    return {

    }
})();

 // Player Factory Function
 const Player = (title, mark) => {
    const getName = () => title;
    const getMark = () => mark;

    return {
        getName,
        getMark
    }
};

//Create gameboard module (square event listeners, check winning combos)
const gameBoard = ( () => {
    const boardMoves = ['','','X','','','','','','',];


    const getSelection = (e) => {
        const squareID = e.target.id;
        makeMove(squareID,'o')
    };

    const gameSquares = document.querySelectorAll('.gamesquare');
    gameSquares.forEach(square => square.addEventListener('click', function(e){
        const selected = e.target;
        if (selected.innerText !== '') return //user can only click on empty squares
        gamePlay.makeMove(selected.id);
    }));


    //Module for updating the board's appearance
    var count = 0;
    const renderBoard = () => {
        gameSquares.forEach( square => {
            square.innerText = boardMoves[count];
            count ++ ;
        });
    };

    //Updates array containing the board's marks
    const updateBoardMoves = () => {
        boardMoves.length = 0; //empty array before updating
        gameSquares.forEach(square => {
            var mark = square.innerText;
            boardMoves.push(mark);
        })
    }



    return {
        boardMoves,
        getSelection,
        renderBoard,
        updateBoardMoves
    };

})();

//Module to track gameplay (create 2 players, control game flow, track scores)
const gamePlay = (() => {
    const playerOne = Player('Insert Name 1', 'X');
    const playerTwo = Player('Insert Name 2', 'O');
    let currentPlayer = playerOne;
    let gameOver = false;
    
    //Sets gamemode to human v human or human v computer
    const gameMode = () => {
        //check to see which player buttons are active
        return 'pvp'
    }
    // const currentMark = playerOne.getMark;


    //Updates DOM based on player's move
    const makeMove = (squareID) => {
        const checkID = parseInt(squareID[squareID.length-1])-1;
        if (checkID < 0 || checkID > 8) return
        if (currentPlayer.getMark() == 'X' || currentPlayer.getMark() == 'O') {
            document.getElementById(`${squareID}`).innerText = currentPlayer.getMark();
            gameBoard.updateBoardMoves()
            togglePlayer();
        };
    };
    const togglePlayer = () => {
        if (gameMode() === 'pvp'){
            console.log(currentPlayer.getName())

            currentPlayer = (currentPlayer === playerOne) ? playerTwo : playerOne;
            console.log(currentPlayer.getMark())
        } else if (gameMode() === 'pva'){
        }
        };


    //Check to see if game is over
    const endGame = () => {
        const winVariations =  [
            [0,1,2],
            [3,4,5],
            [6,7,8],
            [0,3,6],
            [1,4,7],
            [2,5,8],
            [0,4,8],
            [2,4,6],
        ];
        let j = gameBoard.boardMoves;
        // console.log(j[winVariations[0][2]]);
        for (let i = 0; i<winVariations.length; i++){
            if (j[winVariations[i][0]] == j[winVariations[i][1]] && j[winVariations[i][0]] == j[winVariations[i][2]]){
                console.log(j[winVariations[i][0]] + j[winVariations[i][1]] + j[winVariations[i][2]])
                gameOver = (j[winVariations[i][0]] == 'X' || j[winVariations[i][0]] == 'O') ? true : false; 
                console.log(gameOver);
            }
        };       
    }

    return {
        makeMove,
        togglePlayer,
        endGame,
    }

})();





gameBoard.renderBoard()


//Add event listeners to squares
