import chessFigure from "./chessFigure";
import chessGame from "./chessGame";

class bishop extends chessFigure{
    updateRange(board : chessGame) {
        this.range=chessFigure.getDiagonalsArray(this, board)
    }
}

export default bishop