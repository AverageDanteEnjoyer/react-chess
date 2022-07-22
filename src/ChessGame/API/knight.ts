import chessSquare from "./chessSquare";
import chessFigure from "./chessFigure";
import chessGame from "./chessGame";

class knight extends chessFigure{
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