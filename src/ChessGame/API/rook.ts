import chessFigure from "./chessFigure";
import chessGame from "./chessGame";

class rook extends chessFigure{
    updateRange(board : chessGame) {
        this.range=chessFigure.getCrossPathArray(this, board)
    }
}

export default rook