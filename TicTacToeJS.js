
//Module to control HTML DOM
const displayController = ( () => {

    //Setting selector indicators
    const mainDiv = document.querySelector('.main');
    const setupContainer = document.querySelector('.setup-container');
    const gameContainer = document.querySelector('.game-container');
    const gameTitle = document.querySelector('.game-title');
    const playerOneTitle = document.querySelector('.player-one-title');
    const playerTwoTitle = document.querySelector('.player-two-title');
    const playerOneSelector = document.querySelector('#player-one-human-selector');
    const playerTwoSelector = document.querySelector('#player-two-human-selector');
    const AITwoSelector = document.querySelector('#player-two-AI-selector');
    const newGameBtn = document.querySelector('.new-game');


    const activeButton = e => {
        const clicked = e.target;
        if (clicked.classList.contains('active')) return // do nothing if active button is clicked
        clicked.classList.add('active');

        if (clicked.id == 'player-two-human-selector'){
            document.querySelector('#player-two-AI-selector').classList.remove('active');
        } else {
            document.querySelector('#player-two-human-selector').classList.remove('active');
        }
        gamePlay.newGame();
    }

    playerTwoSelector.addEventListener('click', activeButton);
    AITwoSelector.addEventListener('click', activeButton);

    //Sets up 'New Game' button to reset board and start new game
    const startNewGame = () => {
        gamePlay.newGame()
    };
    newGameBtn.addEventListener('click', startNewGame)


    return {
        mainDiv, setupContainer, gameTitle, gameContainer, playerOneTitle, playerTwoTitle,
        playerOneSelector, playerTwoSelector, AITwoSelector, newGameBtn
    }
})();

 // Player Factory Function
 const Player = (title, mark) => {
    const getName = () => title;
    const getMark = () => mark;

    return {
        getName, getMark
    }
};

//Create gameboard module (square event listeners, check winning combos)
const gameBoard = ( () => {
    const boardMoves = ['','','','','','','','','',];
    const getBoardMoves = () => {
        return boardMoves
    };

    const getSelection = (e) => {
        const squareID = e.target.id;
        makeMove(squareID,'o')
    };


    //Make boxes clickable and then unclickable when the game is finished
    const gameSquares = document.querySelectorAll('.gamesquare');
    const clickableSquares = () => {
        const changeText = e => {
            const selected = e.target;
            if (selected.innerText !== '') return //user can only click on empty squares
            if (gamePlay.getGameOver() === true) return //no action if game is over
            gamePlay.makeMove(selected.id);
        };
        gameSquares.forEach(square => square.addEventListener('click', changeText));
    };
    

    //Renders board based on updated boardMoves array
    const renderBoard = () => {
        var count = 0;
        gameSquares.forEach( square => {
            square.innerText = boardMoves[count];
            count ++ ;
        });
    };

    //Updates array (boardMoves) containing the board's marks
    const updateBoardMoves = () => {
        boardMoves.length = 0; //empty array before updating
        gameSquares.forEach(square => {
            var mark = square.innerText;
            boardMoves.push(mark);
        })
    }

    const clearBoard = () => {
        boardMoves.fill(''); //remove marks from board array
        renderBoard(); 
    }

    return {
        getBoardMoves,
        getSelection,
        renderBoard,
        updateBoardMoves,
        clearBoard,
        clickableSquares,
        gameSquares
    };

})();

//Module to track gameplay (create 2 players, control game flow, track scores)
const gamePlay = (() => {
    const playerOne = Player('Human Name 1', 'X');
    const playerTwo = Player('Human Name 2', 'O');
    const AI = Player('Computer', 'O');
    let firstPlayer = playerOne;
    let opposingPlayer = playerTwo;
    let currentPlayer = playerOne;
    let gameOver = false;
    let winningMark = '';
    
    //Starts the game when new game is clicked
    const newGame = () => {
        opposingPlayer = ((displayController.playerTwoSelector).classList.contains('active')) ? playerTwo : AI;
        gameBoard.clearBoard(); //Start with fresh board
        // gameMode(); //Sets pvp or pvc (((Don't need this here??)))
    }

    //Sets gamemode to human v human or human v computer
    const gameMode = () => {
        if (opposingPlayer === playerTwo) return 'pvp'
        return 'pvc'
    }

    // const currentMark = playerOne.getMark;
    const gameCheck = () => {
        console.log('currentPlayer: '  + currentPlayer.getName() + currentPlayer.getMark());  
        console.log('firstPlayer: '  + firstPlayer.getName() + firstPlayer.getMark());  
        console.log('opposingPlayer: '  + opposingPlayer.getName() + opposingPlayer.getMark());  
        console.log('gameOver: '  + gameOver);  
        console.log('gameMode: '  + gameMode());  
    }


    //Updates DOM based on player's move
    const makeMove = (squareID) => {
        const checkID = parseInt(squareID[squareID.length-1])-1;  //determines the index of the square using its ID
        if (checkID < 0 || checkID > 8) return
        if (currentPlayer.getMark() == 'X' || currentPlayer.getMark() == 'O') {
            document.getElementById(`${squareID}`).innerText = currentPlayer.getMark();
            gameBoard.updateBoardMoves();
            winningMove()
            if (getGameOver() === true || getGameOver() === 'tie') {
                endGame();
            };
            togglePlayer();
        };
    };
    const togglePlayer = () => {
        if (gameMode() === 'pvp'){
            currentPlayer = (currentPlayer === playerOne) ? playerTwo : playerOne;
        } else if (gameMode() === 'pva'){
            currentPlayer = (currentPlayer === playerOne) ? AI : playerOne;
        }
        };

    //Check to see if game is over
    const winningMove = () => {
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
        let j = gameBoard.getBoardMoves();
        for (let i = 0; i<winVariations.length; i++){
            if ((j[winVariations[i][0]] == j[winVariations[i][1]]) && (j[winVariations[i][0]] == j[winVariations[i][2]])
            && (j[winVariations[i][0]] == 'X' || j[winVariations[i][0]] == 'O')){
                winningMark = j[winVariations[i][0]];
                gameOver = true;
                gameBoard.clickableSquares(); 
            }; 
        }; 
        if ((j.every(square => square !== '')) && (gameOver !== true)) {
            gameOver = 'tie';
        }      
    }

    //getter for the live value of gameOver
    const getGameOver = () => {
        console.log('gameOver = ' + gameOver);
        return gameOver
    }

    const endGame = () => {
        const endMessage = document.createElement('div');
        const winner = (winningMark == 'X')? firstPlayer : opposingPlayer;
        if (gameOver == true) {
            endMessage.innerText = `${winner.getName()} is the winner.`;
        } else {
            endMessage.innerText = `This round is a tie.`;
        };
        let parentNode = displayController.mainDiv;
        let childNode = displayController.gameContainer;
        console.log(typeof parentNode);
        parentNode.insertBefore(endMessage, childNode);
    }


    return {
        makeMove,
        togglePlayer,
        winningMove,
        endGame,
        newGame,
        gameCheck,
        getGameOver
    }

})();

gameBoard.clickableSquares() //needs initialization after gamePlay module is created






