class CheckerGame {
    constructor(boardSize=8) {
        this.currentPlayer = 0;
        this.isPieceClicked = false;
        this.isPieceCaptured = false;
        this.canCapture = false;
        this.gameOver = false;
        this.pieceClicked = [];
        this.possibleMoves = {};
        this.possibleMovesDisplay = [];
        this.boardSize = boardSize;
        this.boardModel = new CheckerBoard(boardSize)
        this.playerPieces = [this.boardModel.getPlayerPieces(1).length, this.boardModel.getPlayerPieces(2).length]
        this.playerPieceColors = ["black","white"]
        //this.initializeBoard();
    }

    initializeBoard() {
        let n = this.boardSize;
        let table_div = document.getElementById("board_table_div");

        if (table_div.innerHTML) {
            table_div.innerHTML = ""
        }
        let table = document.createElement('table')
        table.setAttribute('id','table_board')
        // table.classList.add("brown")
        table.className = "Brown"
        table_div.appendChild(table)

        for (let i = 0; i < n; ++i) {
            let row = document.createElement('tr');
            row.setAttribute('id', 'row_' + i);
            table.appendChild(row)

            for (let j = 0; j < n; ++j) {
                let td = document.createElement('td')
                td.setAttribute('id', 'square_' + i + '_' + j)
                td.setAttribute('onclick', 'squareClicked(this.id)')
                row.appendChild(td)
            }
        }

        //populate with pieces; determined by model
        for (let i = 0; i < n; ++i) {
            for (let j = 0; j < n; ++j) {
                if (this.boardModel.board[i][j]!=0){
                    let player = this.boardModel.board[i][j]
                    document.getElementById('square_' + i + '_' + j).innerHTML = "<div class='checker_piece player" + player + "' style = 'background-color: "+ this.playerPieceColors[player-1]+"' onclick='clickPiece(this.parentNode.id)'>&nbsp;</div>"
                }
                
            }
        }

        //initialize first possible moves
        this.possibleMoves = {}
        this.getPossibleMoves();
    }

    clickPiece(squareId) {
        let idArray = squareId.split('_').slice(1, 3)
        let r = idArray[0]
        let c = idArray[1]
        console.log(idArray)

        //if piece is already clicked and click on same piece again
        if (this.isPieceClicked) {
            if ((r == this.pieceClicked[0] && c == this.pieceClicked[1])) {
                this.clearPossibleMoves();
            }
            //click on different piece
            else {
                return;
            }
        }

        //if piece is not clicked 
        else {
            this.showPossibleMoves(r, c);
        }
    }

    showPossibleMoves(r, c) {
        let key = r + '_' + c;
        if (key in this.possibleMoves) {
            let square
            //determine squares to add possible-move circle; add them to possibleMovesDisplay array
            for (let m in this.possibleMoves[key]) {
                if (this.canCapture) {
                    square = document.getElementById('square_' + this.possibleMoves[key][m][1][0] + '_' + this.possibleMoves[key][m][1][1])
                } else {
                    square = document.getElementById('square_' + this.possibleMoves[key][m][0] + '_' + this.possibleMoves[key][m][1])
                }
                this.possibleMovesDisplay.push(square.id)
                square.innerHTML = "<div class='possible_move_circle'>&nbsp;</div>"
            }
            this.isPieceClicked = !this.isPieceClicked;
            this.pieceClicked = [r, c];
        } else {
            return;
        }
    }

    clearPossibleMoves() {
        for (let i = 0; i < this.possibleMovesDisplay.length; ++i) {
            document.getElementById(this.possibleMovesDisplay[i]).innerHTML = "";
        }
        this.possibleMovesDisplay = [];
        this.isPieceClicked = false;
    }

    squareClicked(squareId) {
        let idArray = squareId.split('_').slice(1, 3)
        let r = idArray[0]
        let c = idArray[1]

        console.log(squareId)

        //'move' piece; change turn
        if (this.possibleMovesDisplay.includes(squareId)) {

            //move piece to square, remove piece, check piece moves of piece that took

            //piece of clicked square
            // let piece = document.getElementById('square_' + this.pieceClicked[0] + '_' + this.pieceClicked[1]).childNodes[0]
            let piece = this.boardModel.board[this.pieceClicked[0]][this.pieceClicked[1]]
            let UIpiece = document.createElement('div')
                UIpiece.setAttribute('onclick','clickPiece(this.parentNode.id)')
                UIpiece.setAttribute('class',"checker_piece player" + (this.currentPlayer+1))
                UIpiece.setAttribute("style", "background-color: "+ this.playerPieceColors[Number(this.currentPlayer)])
                UIpiece.innerHTML="&nbsp;"
                if (piece == '1k'||piece == '2k'){
                    UIpiece.classList.add('king')
                }

            if (this.canCapture) {
                this.clearPossibleMoves();
                //empty prev square square; fill new square with piece

                //location of piece that's captured
                // let capturedPiece = this.possibleMoves[this.pieceClicked[0] + '_' + this.pieceClicked[1]][0][0]
                let capturedPiece = [
                    Number(this.pieceClicked[0])+((Number(r)-Number(this.pieceClicked[0]))/Math.abs(Number(r)-Number(this.pieceClicked[0]))),
                    Number(this.pieceClicked[1])+((Number(c)-Number(this.pieceClicked[1]))/Math.abs(Number(c)-Number(this.pieceClicked[1])))
                ]

                //global variable
                document.getElementById('square_' + this.pieceClicked[0] + '_' + this.pieceClicked[1]).innerHTML = ""
                this.boardModel.board[this.pieceClicked[0]][this.pieceClicked[1]]=0

                document.getElementById('square_' + capturedPiece[0] + '_' + capturedPiece[1]).innerHTML = ""
                this.boardModel.board[capturedPiece[0]][capturedPiece[1]]=0
                // document.getElementById(squareId).innerHTML = "<div class='checker_piece player" + (currentPlayer+1) + "' onclick='clickPiece(this.parentNode.id)'>&nbsp;</div>"

                document.getElementById(squareId).appendChild(UIpiece)
                this.boardModel.board[r][c]=piece

                let pieceOutput = this.getPieceMoves(r, c)
                if (pieceOutput['captures'].length > 0) {
                    this.playerPieces[Number(!this.currentPlayer)] = this.boardModel.getPlayerPieces(!this.currentPlayer+1).length
                    this.updatePieceCountUI()
                    
                    this.possibleMoves = {};
                    this.possibleMoves[r + '_' + c] = pieceOutput['captures']
                    return
                }
                else {
                    this.canCapture = !this.canCapture
                }
            } else {
                this.clearPossibleMoves();
                //empty prev square square; fill new square with piece
                //global variable
                document.getElementById('square_' + this.pieceClicked[0] + '_' + this.pieceClicked[1]).innerHTML = ""
                this.boardModel.board[this.pieceClicked[0]][this.pieceClicked[1]]=0

                document.getElementById(squareId).appendChild(UIpiece)
                this.boardModel.board[r][c]=piece
                //switch current player;
            }
            //after moving, check if becomes king

            if ((this.currentPlayer == 0 && r == 0) || (this.currentPlayer == 1 && r == this.boardSize - 1)) {
                UIpiece.classList.add('king')
                this.boardModel.board[r][c]=(this.currentPlayer+1) + 'k'
            }
            // document.getElementById("p"+(this.currentPlayer+1)+"_pieces_span").innerText = this.playerPieces[0]
            this.playerPieces[Number(!this.currentPlayer)] = this.boardModel.getPlayerPieces(!this.currentPlayer+1).length
            this.updatePieceCountUI()
            this.currentPlayer = !this.currentPlayer;
            //get possible moves

            this.possibleMoves = {};
            this.getPossibleMoves();
            console.log(this.boardModel.board)
        }
        if (!this.gameOver) {
            //delay to display alert after screen updates
            setTimeout(() => { this.handleGameOver() }, 100)
            //current player
            //how long the game took
            //win or loss for current player
            
        }
        
    }

    handleGameOver() {
        if (this.isEmptyObject(this.possibleMoves)) {
            let oppositePlayer = !this.currentPlayer + 1
            alert("Game over: Player " + oppositePlayer + " wins!")
            this.gameOver = 1

            won = (this.currentPlayer === 0) ? 1 : 0;

            // Send results to game server if logged in
            if (Cookies.get('user_id')) {
                const time = convertToFullTimeFormat(document.getElementById('timer').innerHTML)
                this.sendGameResults(Cookies.get('user_id'), time, won); 
                //  this.sendGameResults(Cookies.get('user_id'), score, turns, time, won); TODO: Add score and turns
            }
        }
    }

    sendGameResults(playerId, score, turns, duration, won) {
        // Prepare data in URL-encoded format
        const postData = new URLSearchParams({
            player_id: playerId,
            score: score,
            turns: turns,
            duration: duration,
            won: won ? 1 : 0 // Convert boolean to 1 or 0
        });
    
        // Send POST request to server
        fetch('../server/gameAPI.php?action=endGame', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: postData
        })
        .then(response => response.json())
        .then(data => {
            if (data.message) {
                console.log("Game results recorded: ", data);
            } else {
                console.error("Error recording game results: ", data.error);
            }
        })
        .catch(error => {
            console.error("Network error: ", error);
        });
    }
    
    convertToFullTimeFormat(shortTimeFormat) {
        // Split the short time format into minutes and seconds
        const [minutes, seconds] = shortTimeFormat.split(':').map(Number);
    
        // Calculate hours, remaining minutes, and seconds
        const hours = Math.floor(minutes / 60);
        const remainingMinutes = minutes % 60;
    
        // Pad with zeros to ensure two digits
        const paddedHours = hours.toString().padStart(2, '0');
        const paddedMinutes = remainingMinutes.toString().padStart(2, '0');
        const paddedSeconds = seconds.toString().padStart(2, '0');
    
        // Combine into full time format
        return `${paddedHours}:${paddedMinutes}:${paddedSeconds}`;
    }
    
    

    getPieceMoves(row, col) {
        let playerSub = this.currentPlayer ? -1 : 1;

        let r = Number(row)
        let c = Number(col)

        // let piece = document.getElementById('square_' + r + '_' + c).childNodes[0]
        let moves
        // if (piece.classList.contains('king')) {
        if (this.boardModel.board[r][c]=="1k"||this.boardModel.board[r][c]=="2k") {
            moves = [[r - 1, c - 1], [r - 1, c + 1], [r + 1, c - 1], [r + 1, c + 1]]
        }
        else {
            moves = [[r - playerSub, c - 1], [r - playerSub, c + 1]]
        }
        //get possible move numbers; each non-king piece has two possible moves
        let pieceMoves = []
        let pieceCaptures = []

        for (let m in moves) {
            // check if square is within bounds
            if ((0 <= moves[m][0] && moves[m][0] < this.boardSize) && (0 <= moves[m][1] && moves[m][1] < this.boardSize)) {
                // let nextSquare = document.getElementById("square_" + moves[m][0] + "_" + moves[m][1])
                let nextSquare = this.boardModel.board[moves[m][0]][moves[m][1]]
                //check if square is unoccupied
                //to do: check if able to take
                if (nextSquare==0) {
                    pieceMoves.push([moves[m][0], moves[m][1]])
                }

                //if next square has an enemy piece, check if can capture
                // else if (nextSquare.firstChild.classList[1] == ("player" + (!this.currentPlayer + 1))) {
                else if (nextSquare == !this.currentPlayer + 1 || nextSquare == (!this.currentPlayer + 1)+'k') {
                    //diagonal capture move
                    let rr = moves[m][0] - r
                    let cc = moves[m][1] - c
                    let captureMove = [moves[m][0] + rr, moves[m][1] + cc]
                    // console.log(nextSquare.firstChild.classList[1]);
                    if (
                        (0 <= captureMove[0] && captureMove[0] < this.boardSize) &&
                        (0 <= captureMove[1] && captureMove[1] < this.boardSize)) {
                        // let nextCaptureSquare = document.getElementById("square_" + captureMove[0] + "_" + captureMove[1])
                        let nextCaptureSquare = this.boardModel.board[captureMove[0]][captureMove[1]]
                        if (nextCaptureSquare==0) {
                            console.log([captureMove[0], captureMove[1]])
                            pieceCaptures.push([[moves[m][0], moves[m][1]], [captureMove[0], captureMove[1]]])
                        }
                    }
                }
            }
        }


        return { "moves": pieceMoves, "captures": pieceCaptures };
    }

    getPossibleMoves() {
        // let playerPieces = document.getElementsByClassName('player' + (this.currentPlayer + 1));
        let playerPieces = this.boardModel.getPlayerPieces(this.currentPlayer + 1)

        //containing all moves were it's possible to take an enemy piece
        let possibleCaptures = {}

        //check all players pieces for possible moves
        for (let i = 0; i < playerPieces.length; ++i) {
            // let idArray = playerSquares[i].id.split('_')
            //location of piece
            // let r = Number(idArray[1])
            // let c = Number(idArray[2])

            let r = playerPieces[i][0]
            let c = playerPieces[i][1]

            let pieceOutput = this.getPieceMoves(r, c)

            if (pieceOutput['moves'].length > 0) {
                this.possibleMoves[r + '_' + c] = pieceOutput['moves'];
            }
            if (pieceOutput['captures'].length > 0) {
                possibleCaptures[r + '_' + c] = pieceOutput['captures']
            }

        }
        if (!this.isEmptyObject(possibleCaptures)) {
            this.possibleMoves = possibleCaptures
            this.canCapture = true
        }
        console.log(this.possibleMoves)
    }
    
    updatePieceCountUI(){
        document.getElementById("p1_pieces_span").innerText = this.playerPieces[0]
        document.getElementById("p2_pieces_span").innerText = this.playerPieces[1]
    }

    isEmptyObject(obj) {
        for (let i in obj) {
            return false
        }
        return true
    }
}

// Create an instance of the CheckerGame class