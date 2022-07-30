import chessFigure from "../chessFigure";
import chessGame from "../chessGame";

class rook extends chessFigure{
    constructor(isWhite : boolean, board : chessGame, col : string | number, row : number) {
        super(isWhite, board, col, row);
        this.iconUrl= isWhite ? "https://upload.wikimedia.org/wikipedia/commons/7/72/Chess_rlt45.svg" : "https://upload.wikimedia.org/wikipedia/commons/f/ff/Chess_rdt45.svg"
    }
    updateRange(board : chessGame) {
        this.range=chessFigure.getCrossPathArray(this, board)
    }
}

export default rook