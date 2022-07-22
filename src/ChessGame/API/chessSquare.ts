import {column} from "../utils";
import chessFigure from "./chessFigure";
import {numRep} from "../utils";
import {strRep} from "../utils";

class chessSquare{
    col : column
    row : number
    figure : chessFigure | undefined
    isWhite : boolean

    constructor(col: string | number, row : number, isWhite: boolean) {
        this.setSquare(col, row, isWhite)
    }

    get getRow() : number{
        return this.row
    }

    get getCol() : column{
        return this.col
    }

    get getFigure() : chessFigure | undefined{
        return this.figure
    }

    get getIsWhite() : boolean{
        return this.isWhite
    }

    setSquare(col : string | number, row : number, isWhite: boolean) : void{
        col=numRep(col)
        if(row < 1 || row > 8) throw new Error('Incorrect row index')
        this.row=row
        if(col < 1 || col > 8) throw new Error('Incorrect column index')
        this.col={asLetter:strRep(col), asIndex:col}
        this.isWhite=isWhite
    }
}

export default chessSquare