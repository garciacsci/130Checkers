const showButton = document.getElementById("showDialog");
const settingsDialog = document.getElementById("settingsDialog");
const confirmBtn = settingsDialog.querySelector("#confirmBtn");

// "Show the dialog" button opens the <dialog> modally
showButton.addEventListener("click", () => {
  settingsDialog.showModal();
});

// Prevent the "confirm" button from the default behavior of submitting the form, and close the dialog with the `close()` method, which triggers the "close" event.
confirmBtn.addEventListener("click", (event) => {
  event.preventDefault(); // We don't want to submit this fake form
  modifyBoardPieceUI()
  settingsDialog.close(); // Have to send the select box value here.
});

function modifyBoardPieceUI(){
  let boardSelect = document.getElementById("board_color_select")
  let player1PieceColor = document.getElementById("p1_piece_color_select")
  let player2PieceColor = document.getElementById("p2_piece_color_select")
  let boardSizeSelect = document.getElementById("board_size_select")

  // Array(document.getElementsByClassName("player1")).map((p)=>p.style.backgroundColor = player1PieceColor.value )
  document.querySelectorAll(".checker_piece.player1").forEach(p =>{
    p.style.backgroundColor = player1PieceColor.value
  })
  cgame.playerPieceColors[0]=player1PieceColor.value

  document.querySelectorAll(".checker_piece.player2").forEach(p =>{
    p.style.backgroundColor = player2PieceColor.value
  })
  cgame.playerPieceColors[1]=player2PieceColor.value

  document.getElementById("table_board").className = boardSelect.value

  if(cgame.boardSize != boardSizeSelect.value){
    resetGame(boardSizeSelect.value)
  }
}