import chessGame from "./chessGame";
import chessFigure from "./chessFigure";

class king extends chessFigure{
    updateRange(board : chessGame){
        this.range = board.getSquares.filter(element => (Math.abs(element.getRow - this.square.getRow) <= 1
            && Math.abs(element.getCol.asIndex - this.square.getCol.asIndex) <=1) && (!element.getFigure || element.getFigure.getIsWhite !== this.getIsWhite))
    }
}

export default king