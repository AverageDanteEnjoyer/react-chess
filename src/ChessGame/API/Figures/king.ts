import chessGame from "../chessGame";
import chessFigure from "../chessFigure";

class king extends chessFigure{
    constructor(isWhite : boolean, board : chessGame, col : string | number, row : number) {
        super(isWhite, board, col, row);
        this.iconUrl= isWhite ? "https://upload.wikimedia.org/wikipedia/commons/4/42/Chess_klt45.svg" : "https://upload.wikimedia.org/wikipedia/commons/f/f0/Chess_kdt45.svg"
    }
    updateRange(board : chessGame){
        this.range = board.getSquares.filter(element => (Math.abs(element.getRow - this.square.getRow) <= 1
            && Math.abs(element.getCol.asIndex - this.square.getCol.asIndex) <=1) && (!element.getFigure || element.getFigure.getIsWhite !== this.getIsWhite))
    }
}

export default king