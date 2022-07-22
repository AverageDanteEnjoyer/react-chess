import {matchSquare} from "../utils";
import chessSquare from "./chessSquare";
import king from "./king";
import queen from "./queen";
import pawn from "./pawn";
import knight from "./knight";
import bishop from "./bishop";
import rook from "./rook";

class chessGame{
    squares : Array<chessSquare>
    isWhitesTurn : boolean
    check : boolean
    isPositionLegal : boolean
    whiteCanCastle : boolean //Not clearly that they can castle. This flag is an information about whether, or not either rook or king have moved this game (other requirements will be checked right before castling)
    blackCanCastle : boolean //same as with whiteCanCastle
    moveCounter : number
    constructor() {
        this.squares=new Array(8*8)
        for(let i=0;i<8;i++){
            for(let j=0;j<8;j++){
                this.squares[i*8+j]=new chessSquare(j+1, i+1, (i+j) % 2 === 0)
            }
        }
        this.isWhitesTurn=true
        this.check=false
        this.isPositionLegal=true
        this.whiteCanCastle=true
        this.blackCanCastle=true
        this.moveCounter=0
    }
    get getSquares() : Array<chessSquare>{
        return this.squares
    }
    getSquare(col: number | string, row: number) : chessSquare | undefined{
        return this.squares.find(element => matchSquare(element, col, row))
    }

    Initiate(): void{
        for(let square of this.squares){
            square.figure=undefined
        }
        for(let square of this.squares.filter(element => element.getRow===2)){
            new pawn(true, this, square.getCol.asIndex, square.getRow)
        }
        for(let square of this.squares.filter(element => element.getRow===7)){
            new pawn(false, this, square.getCol.asIndex, square.getRow)
        }

        new queen(true, this, "D", 1)
        new queen(false, this, "D", 8)

        new king(true, this, "E", 1)
        new king(false, this, "E", 8)

        new bishop(true, this, "C", 1)
        new bishop(true, this, "F", 1)
        new bishop(false, this, "C", 8)
        new bishop(false, this, "F", 8)

        new knight(true, this, "B", 1)
        new knight(true, this, "G", 1)
        new knight(false, this, "B", 8)
        new knight(false, this, "G", 8)

        new rook(true, this, "A", 1)
        new rook(true, this, "H", 1)
        new rook(false, this, "A", 8)
        new rook(false, this, "H", 8)

        this.isWhitesTurn=true
        this.check=false
        this.isPositionLegal=true
        this.whiteCanCastle=true
        this.blackCanCastle=true
        this.moveCounter=0
    }
    setCheck(val: boolean): void{
        this.check=val
    }
    setIsPositionLegal(val: boolean): void{
        this.isPositionLegal=val
    }
    setTurn(isWhitesTurn: boolean): void{
        this.isWhitesTurn=isWhitesTurn
    }
    get getCheck(): boolean{
        return this.check
    }
    get getIsPositionLegal(): boolean{
        return this.isPositionLegal
    }
    get getIsWhitesTurn(): boolean{
        return this.isWhitesTurn
    }
}

export default chessGame