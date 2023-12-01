var cgame 
var timer

function initGame(boardSize){
    document.getElementById("board_table_div").innerHTML=""
    cgame = new CheckerGame(boardSize)
    cgame.initializeBoard()

    timer = new Timer()
    timer.startTimer()
}
function squareClicked(id){
    cgame.squareClicked(id)
}
function clickPiece(id){
    cgame.clickPiece(id)
}
function startTimer(){
    timer.startTimer()
}
function stopTimer(){
    timer.stopTimer()
}
function resetTimer(){
    timer.resetTimer()
    timer.updateTimer()
}