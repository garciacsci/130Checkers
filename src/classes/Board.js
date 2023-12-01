class CheckerBoard{
    constructor(boardSize=8){
        this.boardSize = boardSize
        this.board = this.initEmpty()
        this.createModel()
    }
    createModel(){
        let player = 2
        let n = this.boardSize
        for (let i = 0; i < n; ++i) {
            for (let j = 0; j < n; ++j) {
                if (i < Math.floor(n / 2) - 1 || i > n - (Math.floor(n / 2))) {
                    if (i % 2 == 0) {
                        if (j % 2 != 0) {
                            this.board[i][j] = player
                        }
                    }
                    else if (j % 2 == 0) {
                        this.board[i][j] = player
                    }
                } else if (player == 2) {
                    player--;
                }
            }
        }
        console.log(this.board)
    }
    initEmpty(){
        let board = []
        for(let i = 0;i<this.boardSize;++i){
            board.push([])
            for(let j = 0;j<this.boardSize;++j){
                board[i].push(0)
            }
        }
        return board
    }
    getPlayerPieces(player){
        let pieces = []
        for(let i = 0;i<this.boardSize;++i){
            for(let j = 0;j<this.boardSize;++j){
                if(this.board[i][j] == player || this.board[i][j] == player+'k'){
                    pieces.push([i,j])
                }
            }
        }
        return pieces
    }
}