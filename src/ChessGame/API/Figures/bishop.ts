import chessFigure from "../chessFigure";
import chessGame from "../chessGame";

class bishop extends chessFigure{
    constructor(isWhite : boolean, board : chessGame, col : string | number, row : number) {
        super(isWhite, board, col, row);
        this.iconUrl= isWhite ? "https://upload.wikimedia.org/wikipedia/commons/b/b1/Chess_blt45.svg" : "https://upload.wikimedia.org/wikipedia/commons/9/98/Chess_bdt45.svg"
    }
    updateRange(board : chessGame) {
        this.range=chessFigure.getDiagonalsArray(this, board)
    }
}

export default bishop