import chessSquare from "../chessSquare";
import chessFigure from "../chessFigure";
import chessGame from "../chessGame";

class knight extends chessFigure{
    constructor(isWhite : boolean, board : chessGame, col : string | number, row : number) {
        super(isWhite, board, col, row);
        this.iconUrl= isWhite ? "https://upload.wikimedia.org/wikipedia/commons/7/70/Chess_nlt45.svg" : "https://upload.wikimedia.org/wikipedia/commons/e/ef/Chess_ndt45.svg"
    }
    updateRange(board : chessGame) {
        let row : number=this.getSquare.getRow
        let col : number=this.getSquare.getCol.asIndex

        let twoRowOneCol : Array<chessSquare> | undefined=board.getSquares.filter(element => Math.abs(element.getCol.asIndex - col) === 1 && Math.abs(element.getRow - row) === 2)
        let oneRowTwoCol : Array<chessSquare> | undefined=board.getSquares.filter(element => Math.abs(element.getRow - row) === 1 && Math.abs(element.getCol.asIndex - col) === 2)
        let merged : Array<chessSquare> | undefined=twoRowOneCol.concat(oneRowTwoCol)

        merged=merged.filter(element => !(element.getFigure && element.getFigure.getIsWhite === this.getIsWhite))
        this.range=merged
    }
}

export default knight