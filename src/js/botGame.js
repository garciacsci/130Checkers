var cgame;
var timer;

function initGame(boardSize){
    document.getElementById("board_table_div").innerHTML = "";
    cgame = new CheckerGame(boardSize, true); // True indicates it's a bot game
    cgame.initializeBoard();

    timer = new Timer();
    timer.startTimer();
}

function squareClicked(id){
    cgame.squareClicked(id);
    if (cgame.currentPlayer === 1) { // If it's the bot's turn
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

function botMove() {
    // AI logic to decide the move
    // Placeholder for AI's move logic
    // Once the move is decided, update the board accordingly
    // For example: cgame.botMove(row, col);

    // Switch back to player's turn after move
    cgame.currentPlayer = 0;
}
