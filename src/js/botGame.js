var cgame;
var timer;

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function initGame(boardSize){
    document.getElementById("board_table_div").innerHTML = "";
    // cgame = new BotCheckerGame(boardSize);
    cgame = new CheckerGame(boardSize)
    cgame.initializeBoard();

    timer = new Timer();
    timer.startTimer();
}

function squareClicked(id){
    cgame.squareClicked(id);
    
    let firstPiece = getPossibleMoveKey(0);
    firstPiece_arr = firstPiece.split('_');
    


    firstPiece = [Number(firstPiece_arr[0]),Number(firstPiece_arr[1])]
    console.log('firstPiece: ',firstPiece);
    if (cgame.boardModel.board[firstPiece[0]][firstPiece[1]] === 2 || 
        cgame.boardModel.board[firstPiece[0]][firstPiece[1]] === '2k') { // If it's the bot's turn
        botMove();
    }
    
}

function clickPiece(id){
    cgame.clickPiece(id);
}

function startTimer(){
    timer.startTimer();
}

function stopTimer(){
    timer.stopTimer();
}

function resetTimer(){
    timer.resetTimer();
    timer.updateTimer();
}
function resetGame(boardSize){
    timer.stopTimer()
    initGame(boardSize)
}

function getObjectKeyByIndex(obj, index) {
    console.log("getObjectKey: ",Object.keys(obj)[index])
    return Object.keys(obj)[index]
}

function getPossibleMoveKey(index) {
    return getObjectKeyByIndex(cgame.possibleMoves, index);
}

function getSquareString() {

}


function findShortestPathToEnemy(board) {
    let shortestDistance = Infinity;
    let potentialPieces = [];

    for (let rowIndex = 0; rowIndex < board.length; rowIndex++) {
        for (let colIndex = 0; colIndex < board[rowIndex].length; colIndex++) {
            if (board[rowIndex][colIndex] === 2 || board[rowIndex][colIndex] === '2k') {
                const distanceInfo = getClosestEnemyPiece(board, rowIndex, colIndex);
                if (distanceInfo.distance < shortestDistance) {
                    shortestDistance = distanceInfo.distance;
                    potentialPieces = [[rowIndex, colIndex, distanceInfo.closestEnemy]];
                } else if (distanceInfo.distance === shortestDistance) {
                    potentialPieces.push([rowIndex, colIndex, distanceInfo.closestEnemy]);
                }
            }
        }
    }

    // Choose randomly among equidistant pieces or apply other selection criteria
    if (potentialPieces.length > 1) {
        const chosenIndex = Math.floor(Math.random() * potentialPieces.length);
        return {
            closestPiece: potentialPieces[chosenIndex].slice(0, 2),
            targetPiece: potentialPieces[chosenIndex][2],
            shortestDistance
        };
    } else if (potentialPieces.length === 1) {
        return {
            closestPiece: potentialPieces[0].slice(0, 2),
            targetPiece: potentialPieces[0][2],
            shortestDistance
        };
    }

    return { closestPiece: null, targetPiece: null, shortestDistance: null };
}

function getClosestEnemyPiece(board, row, col) {
    let closestEnemy = null;
    let shortestDistance = Infinity;

    for (let rowIndex = 0; rowIndex < board.length; rowIndex++) {
        for (let colIndex = 0; colIndex < board[rowIndex].length; colIndex++) {
            if (board[rowIndex][colIndex] === 1 || board[rowIndex][colIndex] === '1k') {
                let distance = Math.max(Math.abs(rowIndex - row), Math.abs(colIndex - col));
                if (distance < shortestDistance) {
                    shortestDistance = distance;
                    closestEnemy = [rowIndex, colIndex];
                }
            }
        }
    }

    return { distance: shortestDistance, closestEnemy };
}




function botMove() {
    // Determine if Regular or Capture moves
    if (cgame.canCapture) {
        // TODO: create set of moves that capture most pieces
        // TODO: randomly select one these moves to execute
        // for now, execute first possible capture move
        
        let square_string = "square_" + getPossibleMoveKey(0); // + '_' + cgame.possibleMoves[1]
        // clickPiece(square_string);
        sleep(500);
        clickPiece(square_string) 
        // setTimeout(() => { clickPiece(square_string) }, 500) // hold on pal

        // possible_moves = cgame.possibleMovesDisplay;

        // TODO: Randomly select index from possible_moves.length
        
        //                                       'square_#_#'
        //setTimeout(() => { squareClicked(cgame.possibleMovesDisplay[0])}, 500) // wait a sec
        sleep(1000);
        // setTimeout(() => { squareClicked(cgame.possibleMovesDisplay[0])}, 500) // wait a sec
        squareClicked(cgame.possibleMovesDisplay[0])
        
    } else {
        // LOGIC Take shortest route if not seppuku

        // Call function to determine moves on quickest route to enemy pieces
        //  square_#_#, square_#_#
        // [string: piece going to move, string: square where it goes]
        /*
        piece_string -> [destination_string, destination_string]

        */

        console.log('PIECE TO MOVE YO: ', findShortestPathToEnemy(cgame.boardModel.board).closestPiece);
        let moves = findShortestPathToEnemy(cgame.boardModel.board);

        // formatted string for clickPiece
        let formattedPiece = "square_" + moves.closestPiece[0] + '_' + moves.closestPiece[1];
        console.log('formattedPiece: ',formattedPiece);



        // TODO: randomly select one of determined moves to execute
        // for now, execute first  move
        

        
        
        //let determinedPiece = getObjectKeyByIndex(moves, 0); // make random int from 0 to moves.length later

        //                 clickPiece takes square_#_# as param
        // setTimeout(() => { clickPiece(formattedPiece) }, 500) // hold on pal


        let counter = 0;
        while(true) {
            setTimeout(() => { clickPiece(formattedPiece) }, 500) // hold on pal
            //clickPiece(formattedPiece)
            if (cgame.possibleMovesDisplay.length > 0) {
                break;
            }

            let square_string = "square_" + getPossibleMoveKey(counter); // + '_' + cgame.possibleMoves[1]
            // clickPiece(square_string);
            clickPiece(square_string) 
            counter++;
            if (counter > getPossibleMoveKey.length) {
                break;
            }
        }

        // possible_moves = cgame.possibleMovesDisplay;

        // TODO: Randomly select index from possible_moves.length
        
        console.log(cgame.possibleMovesDisplay[0]);
        squareToClick = cgame.possibleMovesDisplay[0];
        squareClicked(squareToClick);
        // setTimeout(() => { squareClicked(cgame.possibleMovesDisplay[0])}, 500) // wait a sec 
        // make random int from 0 to moves.length later

    }



    


    // AI logic to decide the move
    // Placeholder for AI's move logic
    // Once the move is decided, update the board accordingly
    // For example: cgame.botMove(row, col);

    // Switch back to player's turn after move
    // handled by square click function // cgame.currentPlayer = 0;
}
