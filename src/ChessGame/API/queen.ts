import chessFigure from "./chessFigure";
import chessGame from "./chessGame";
import chessSquare from "./chessSquare";

class queen extends chessFigure{
    updateRange(board : chessGame) {
        let diagonals : Array<chessSquare> | undefined=chessFigure.getDiagonalsArray(this, board)
        if(!diagonals){
            diagonals=[]
        }
        this.range=chessFigure.getCrossPathArray(this, board)?.concat(diagonals)
    }
}

export default queen