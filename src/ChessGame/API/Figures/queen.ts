import chessFigure from "../chessFigure";
import chessGame from "../chessGame";
import chessSquare from "../chessSquare";

class queen extends chessFigure{
    constructor(isWhite : boolean, board : chessGame, col : string | number, row : number) {
        super(isWhite, board, col, row);
        this.iconUrl= isWhite ? "https://upload.wikimedia.org/wikipedia/commons/1/15/Chess_qlt45.svg" : "https://upload.wikimedia.org/wikipedia/commons/4/47/Chess_qdt45.svg"
    }
    updateRange(board : chessGame) {
        let diagonals : Array<chessSquare> | undefined=chessFigure.getDiagonalsArray(this, board)
        if(!diagonals){
            diagonals=[]
        }
        this.range=chessFigure.getCrossPathArray(this, board)?.concat(diagonals)
    }
}

export default queen