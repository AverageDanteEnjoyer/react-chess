import chessFigure from "../chessFigure";
import chessGame from "../chessGame";
import chessSquare from "../chessSquare";

class pawn extends chessFigure{
    constructor(isWhite : boolean, board : chessGame, col : string | number, row : number) {
        super(isWhite, board, col, row);
        this.iconUrl= isWhite ? "https://upload.wikimedia.org/wikipedia/commons/4/45/Chess_plt45.svg" : "https://upload.wikimedia.org/wikipedia/commons/c/c7/Chess_pdt45.svg"
    }
    updateRange(board: chessGame){
        let baseRange : Array<chessSquare> | undefined
        let nonEmpty : chessSquare | undefined
        if(this.getIsWhite===true){
            baseRange=board.getSquares.filter(element => element.getCol.asLetter===this.square.getCol.asLetter
                && element.getRow >= this.square.getRow+1
                && element.getRow <= this.square.getRow+2)
            if(this.square.getRow!==2){
                baseRange=baseRange.filter(element => element.getRow === this.square.getRow + 1)
            }
            nonEmpty=baseRange.find(element => element.getFigure!==undefined)
            while(nonEmpty!==undefined){
                baseRange=baseRange.filter(element => nonEmpty && element.getRow < nonEmpty.getRow)
                nonEmpty=baseRange.find(element => element.getFigure!==undefined)
            }
            board.getSquare(this.square.getCol.asIndex-1, this.square.getRow+1)
            let diagonal1 : chessSquare | undefined=board.getSquare(this.square.getCol.asIndex-1, this.square.getRow+1)
            let diagonal2 : chessSquare | undefined=board.getSquare(this.square.getCol.asIndex+1, this.square.getRow+1)
            if(diagonal1!==undefined){
                if(diagonal1.getFigure && diagonal1.getFigure.getIsWhite===false){
                    baseRange.push(diagonal1)
                }
            }
            if(diagonal2!==undefined){
                if(diagonal2.getFigure && diagonal2.getFigure.getIsWhite===false){
                    baseRange.push(diagonal2)
                }
            }
        }else{
            baseRange=board.getSquares.filter(element => element.getCol.asLetter===this.square.getCol.asLetter
                && element.getRow <= this.square.getRow-1
                && element.getRow >= this.square.getRow-2)
            if(this.square.getRow!==7){
                baseRange=baseRange.filter(element => element.getRow === this.square.getRow - 1)
            }
            nonEmpty=baseRange.find(element => element.getFigure!==undefined)
            while(nonEmpty!==undefined){
                baseRange=baseRange.filter(element => nonEmpty && element.getRow > nonEmpty.getRow)
                nonEmpty=baseRange.find(element => element.getFigure!==undefined)
            }
            let diagonal1 : chessSquare | undefined=board.getSquare(this.square.getCol.asIndex-1, this.square.getRow-1)
            let diagonal2 : chessSquare | undefined=board.getSquare(this.square.getCol.asIndex+1, this.square.getRow-1)
            if(diagonal1!==undefined){
                if(diagonal1.getFigure && diagonal1.getFigure.getIsWhite===true){
                    baseRange.push(diagonal1)
                }
            }
            if(diagonal2!==undefined){
                if(diagonal2.getFigure && diagonal2.getFigure.getIsWhite===true){
                    baseRange.push(diagonal2)
                }
            }
        }
        this.range=baseRange
    }
}

export default pawn