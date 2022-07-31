import {matchSquare, numRep, strRep} from "../utils";
import chessSquare from "./chessSquare";
import chessGame from "./chessGame";
import king from "./Figures/king";
import chessBoard from "../ChessBoard";


class chessFigure{
    iconUrl : string | undefined
    isWhite : boolean
    square : chessSquare
    range : Array<chessSquare> | undefined
    constructor(isWhite : boolean, board : chessGame, col : string | number, row : number) {
        let numberOfChecks : number=0
        this.isWhite=isWhite

        col=numRep(col)
        let figureSquare=board.getSquare(col, row)
        if(!figureSquare){
            throw new Error('Element of index '+col+row+' does not exist')
        }
        this.square=figureSquare
        this.square.figure=this

        board.updateAndValidate()
    }
    static getCrossPathArray(figure : chessFigure, board : chessGame) : Array<chessSquare> | undefined{
        let uprightRange : Array<chessSquare> | undefined
        let horizontalRange : Array<chessSquare> | undefined

        //setting base ranges in both directions (as if there were no obstacles)
        uprightRange=board.getSquares.filter(element => element.getCol.asLetter===figure.getSquare.getCol.asLetter && element!==figure.getSquare)
        horizontalRange=board.getSquares.filter(element => element.getRow===figure.getSquare.getRow && element!==figure.getSquare)

        //setting boundaries of the range
        const min_row : number=Math.max.apply(null, uprightRange.filter(element => element.getRow < figure.getSquare.getRow && element.getFigure).map((element) => {
            return element.getRow
        }))
        const max_row : number=Math.min.apply(null, uprightRange.filter(element => element.getRow > figure.getSquare.getRow && element.getFigure).map((element) => {
            return element.getRow
        }))
        const min_col=Math.max.apply(null, horizontalRange.filter(element => element.getCol.asIndex < figure.getSquare.getCol.asIndex && element.getFigure).map((element) => {
            return element.getCol.asIndex
        }))
        const max_col=Math.min.apply(null, horizontalRange.filter(element => element.getCol.asIndex > figure.getSquare.getCol.asIndex && element.getFigure).map((element) => {
            return element.getCol.asIndex
        }))

        uprightRange=uprightRange.filter(element => element.getRow <= max_row && element.getRow >= min_row)
        horizontalRange=horizontalRange.filter(element => element.getCol.asIndex <= max_col && element.getCol.asIndex >= min_col)

        //removing the blocker figures from the range, if they match a color of the rook
        uprightRange=uprightRange.filter(element => !((element.getRow === max_row || element.getRow === min_row) && element.getFigure?.getIsWhite === figure.getSquare.getFigure?.getIsWhite))
        horizontalRange=horizontalRange.filter(element => !((element.getCol.asIndex === max_col || element.getCol.asIndex === min_col) && element.getFigure?.getIsWhite === figure.getSquare.getFigure?.getIsWhite))

        //merging the ranges
        return uprightRange.concat(horizontalRange)
    }
    static getDiagonalsArray(figure : chessFigure, board : chessGame) : Array<chessSquare> | undefined{
        let leftDiagonal
        let rightDiagonal

        const row=figure.getSquare.getRow
        const col=figure.getSquare.getCol.asIndex

        //setting base diagonals (as if there were no obstacles)
        rightDiagonal=board.getSquares.filter(element => ((element.getRow-row) === (element.getCol.asIndex-col)) && element!==figure.getSquare)
        leftDiagonal=board.getSquares.filter(element => ((element.getRow-row) === -(element.getCol.asIndex-col)) && element!==figure.getSquare)

        //setting boundaries of the diagonals
        const minRowRight=Math.max.apply(null, rightDiagonal.filter(element => element.getRow < figure.getSquare.getRow && element.getFigure).map((element) => {
            return element.getRow
        }))
        const maxRowRight=Math.min.apply(null, rightDiagonal.filter(element => element.getRow > figure.getSquare.getRow && element.getFigure).map((element) => {
            return element.getRow
        }))
        const minRowLeft=Math.max.apply(null, leftDiagonal.filter(element => element.getRow < figure.getSquare.getRow && element.getFigure).map((element) => {
            return element.getRow
        }))
        const maxRowLeft=Math.min.apply(null, leftDiagonal.filter(element => element.getRow > figure.getSquare.getRow && element.getFigure).map((element) => {
            return element.getRow
        }))

        rightDiagonal=rightDiagonal.filter(element => element.getRow <= maxRowRight && element.getRow >= minRowRight)
        leftDiagonal=leftDiagonal.filter(element => element.getRow <= maxRowLeft && element.getRow >= minRowLeft)

        //removing the blocker figures from the diagonals, if they match a color of the bishop
        rightDiagonal=rightDiagonal.filter(element => !((element.getRow === maxRowRight || element.getRow === minRowRight) && element.getFigure?.getIsWhite === figure.getIsWhite))
        leftDiagonal=leftDiagonal.filter(element => !((element.getRow === maxRowLeft || element.getRow === minRowLeft) && element.getFigure?.getIsWhite === figure.getIsWhite))

        //merging the diagonals
        return rightDiagonal.concat(leftDiagonal)
    }
    updateRange(board : chessGame) : void{}
    get getIsWhite() : boolean{
        return this.isWhite
    }
    get getRange() : Array<chessSquare> | undefined{
        return this.range
    }
    get getSquare() : chessSquare{
        return this.square
    }
    get getIconUrl(): string | undefined{
        return this.iconUrl
    }
    move(board : chessGame, col : string | number, row : number) : chessGame | undefined{
        if(!this.range?.find(element => matchSquare(element, col, row))){
            return undefined
        }

        let newSquare : chessSquare | undefined=board.getSquare(col, row)
        if(!newSquare){
            return undefined
        }
        let newSquarePrevFigure=newSquare.getFigure
        let prevSquare=this.square
        prevSquare.setFigure=undefined

        newSquare.setFigure=this
        this.square=newSquare

        board.setTurn=!board.getIsWhitesTurn
        board.updateAndValidate()

        if(!board.isPositionLegal){
            newSquare.setFigure=newSquarePrevFigure
            prevSquare.setFigure=this
            this.square=prevSquare

            board.setTurn=!board.getIsWhitesTurn
            board.updateAndValidate()
            return undefined
        }else{
            board.setMoveCounter=board.getMoveCounter+1
            return board
        }
    }
}

export default chessFigure