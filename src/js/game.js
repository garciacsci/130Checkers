//false: player1; true:player2
var currentPlayer = 0;
var isPieceClicked = 0;

//coords of piece that is clicked
var pieceClicked = [];

//all possible moves in a turn
var possibleMoves = {};

//ids of possible move squares
var possibleMovesDisplay = [];
var boardSize = 8;

function createBoard(n) {
    boardSize = n;
    let table_div = document.getElementById("board_table_div");

    if (table_div.innerHTML) {
        table_div.innerHTML = ""
    }
    let table = document.createElement('table')
    table_div.appendChild(table)

    for (let i = 0; i < n; ++i) {
        let row = document.createElement('tr');
        row.setAttribute('id', 'row_' + i);
        table.appendChild(row)

        for (let j = 0; j < n; ++j) {
            let td = document.createElement('td')
            td.setAttribute('id', 'square_' + i + '_' + j)
            td.setAttribute('onclick','squareClicked(this.id)')
            row.appendChild(td)
        }
    }

    let player = 2
    //populate with pieces
    for (let i = 0; i < n; ++i) {
        for (let j = 0; j < n; ++j) {
            if (i < Math.floor(n / 2) - 1 || i > n - (Math.floor(n / 2))) {
                if (i % 2 == 0) {
                    if (j % 2 != 0) {
                        document.getElementById('square_' + i + '_' + j).innerHTML = "<div class='checker_piece player" + player + "' onclick='clickPiece(this.parentNode.id)'>&nbsp;</div>"
                    }
                }
                else if (j % 2 == 0) {
                    document.getElementById('square_' + i + '_' + j).innerHTML = "<div class='checker_piece player" + player + "' onclick='clickPiece(this.parentNode.id)'>&nbsp;</div>"
                }
            } else if (player == 2) {
                player--;
            }
        }
    }

    //initialize first possible moves
    possibleMoves = {}
    getPossibleMoves();
}

function clickPiece(squareId) {
    
    let idArray = squareId.split('_').slice(1,3)
    let r = idArray[0]
    let c = idArray[1]
    console.log(idArray)

    //if piece is already clicked and click on same piece again
    if (isPieceClicked) {
        if((r == pieceClicked[0] && c == pieceClicked[1])){
            clearPossibleMoves();
        }
        //click on different piece
        else{
            return;
        }
    }

    //if piece is not clicked 
    else {
        showPossibleMoves(r,c);
    }
}

//show possible moves of clicked piece
function showPossibleMoves(r,c){
    let key = r + '_' + c;
    if(key in possibleMoves){
        //determine squares to add possible-move circle; add them to possibleMovesDisplay array
        for (let m in possibleMoves[key]) {
            let square = document.getElementById('square_'+ possibleMoves[key][m][0]+'_'+ possibleMoves[key][m][1])
            
            possibleMovesDisplay.push(square.id)
            square.innerHTML = "<div class='possible_move_circle'>&nbsp;</div>"
        }
        isPieceClicked = !isPieceClicked;
        pieceClicked = [r,c];
    }else{
        return;
    }
}

function clearPossibleMoves(){
    for(let i = 0; i < possibleMovesDisplay.length; ++i){
        document.getElementById(possibleMovesDisplay[i]).innerHTML = "";
    }
    possibleMovesDisplay = [];
    isPieceClicked = false;
}

//used to determine where piece is moved
function squareClicked(squareId){
    let idArray = squareId.split('_').slice(1,3)
    let r = idArray[0]
    let c = idArray[1]

    console.log(squareId)

    //'move' piece; change turn
    if(possibleMovesDisplay.includes(squareId)){
        //empty prev square square; fill new square with piece
        clearPossibleMoves();
        document.getElementById('square_' + pieceClicked[0]+'_'+pieceClicked[1]).innerHTML=""
        document.getElementById(squareId).innerHTML = "<div class='checker_piece player" + (currentPlayer+1) + "' onclick='clickPiece(this.parentNode.id)'>&nbsp;</div>"

        //switch current player;
        currentPlayer = !currentPlayer;

        //get possible moves
        clearPossibleMoves();
        possibleMoves={};
        getPossibleMoves();
    }
}

function getPossibleMoves() {
    let playerPieces = document.getElementsByClassName('player' + (currentPlayer + 1));
    let playerSquares = Array.from(playerPieces).map((x) => (x.parentElement));
    // let allSquares = document.querySelectorAll("td[id^='square']")

    let playerSub = currentPlayer ? -1: 1;

    //containing all moves were it's possible to take an enemy piece
    let possibleCaptures = {}

    //check all players pieces for possible moves
    for (let i = 0; i < playerSquares.length; ++i) {
        let idArray = playerSquares[i].id.split('_')
        //location of piece
        let r = Number(idArray[1])
        let c =  Number(idArray[2])

        if (i == 5){
            console.log('hello')
        }

        //get possible move numbers; each non-king piece has two possible moves
        let moves = [[r - playerSub, c - 1], [r - playerSub, c + 1]]
        let captureMoves = [[r - (2 * playerSub), c - 2], [r - (2 * playerSub), c + 2]]

        possibleMoves[r+'_'+c] = []
        possibleCaptures[r+'_'+c] = []

        for (let m in moves) {
            // check if square is within bounds
            if ((0 <= moves[m][0] && moves[m][0] < boardSize) && (0 <= moves[m][1] && moves[m][1] < boardSize)) {
                let nextSquare = document.getElementById("square_" + moves[m][0] + "_" + moves[m][1])

                //check if square is unoccupied
                //to do: check if able to take

                if (!nextSquare.innerHTML) {
                    possibleMoves[r+'_'+c].push([moves[m][0],moves[m][1]])
                }
                else if(nextSquare.firstChild.classList[1] == ("player"+(!currentPlayer+1))){
                    let rr = moves[m][0] - r
                    let cc = moves[m][1] - c

                    let captureMove = [moves[m][0]+rr,moves[m][1]+cc]
                    console.log(nextSquare.firstChild.classList[1]);

                    
                    // for (let cm in captureMoves){
                    //     if (
                    //         (0 <= captureMoves[cm][0] && captureMoves[cm][0] < boardSize) && 
                    //         (0 <= captureMoves[cm][1] && captureMoves[cm][1] < boardSize)){

                    //         let nextCaptureSquare = document.getElementById("square_" + captureMoves[cm][0] + "_" + captureMoves[cm][1])
                    //         if (!nextCaptureSquare.innerHTML){
                    //             console.log([captureMoves[cm][0],captureMoves[cm][1]])
                    //             possibleCaptures[r+'_'+c].push([captureMoves[cm][0],captureMoves[cm][1]])
                    //         }
                    //     }
                    // }

                    if (
                        (0 <= captureMove[0] && captureMove[0] < boardSize) && 
                        (0 <= captureMove[1] && captureMove[1] < boardSize)){

                        let nextCaptureSquare = document.getElementById("square_" + captureMove[0] + "_" + captureMove[1])
                        if (!nextCaptureSquare.innerHTML){
                            console.log([captureMove[0],captureMove[1]])
                            possibleCaptures[r+'_'+c].push([captureMove[0],captureMove[1]])
                        }
                    }
                }
            }
        }

        if(possibleMoves[r+'_'+c].length == 0){
            delete possibleMoves[r+'_'+c]
        }
        if(possibleCaptures[r+'_'+c].length == 0){
            delete possibleCaptures[r+'_'+c]
        }
    }
    // if (possibleCaptures != {}){
    //     possibleMoves = possibleCaptures
    // }
    if (!isEmptyObject(possibleCaptures)){
        possibleMoves = possibleCaptures
    }
    console.log(possibleMoves)
}

function isEmptyObject(obj){
    for(let i in obj){
        return false
    }
    return true
}

function checkIfCanTake(){

}
