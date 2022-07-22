import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';

import chessGame from "./ChessGame/API/chessGame";

import bishop from "./ChessGame/API/bishop";
import pawn from "./ChessGame/API/pawn";
import ChessBoard from "./ChessGame/ChessBoard";

/*type player = "white" | "black"

interface column{
    asLetter: string
    asIndex: number
}
type BoardState={
    squares : Array<chessSquare>
    turn : player
    check : boolean
    isPositionLegal : boolean
    whiteCanCastle : boolean //Not clearly that they can castle. This flag is an information about whether, or not either rook or king have moved this game (other requirements will be checked right before castling)
    blackCanCastle : boolean //same as with whiteCanCastle
    moveCounter : number
}
interface SquareState{
    col : column
    row : number
    figure : chessFigure | undefined
}

function numRep(string: string | number): number{
    if(typeof(string)=="string"){
        return string.charCodeAt(0)-'A'.charCodeAt(0)+1
    }else return string
}
function strRep(number: string | number): string{
    if(typeof number=="number"){
        return String.fromCharCode(number+'A'.charCodeAt(0)-1)
    }else return number
}
function matchSquare(element : chessSquare, col : string | number, row : number) : boolean{
    col=numRep(col)
    return (element.getRow===row && element.getCol.asIndex===col)
}

class chessGame{
    squares : Array<chessSquare>
    turn : player
    check : boolean
    isPositionLegal : boolean
    whiteCanCastle : boolean //Not clearly that they can castle. This flag is an information about whether, or not either rook or king have moved this game (other requirements will be checked right before castling)
    blackCanCastle : boolean //same as with whiteCanCastle
    moveCounter : number
    constructor() {
        this.squares=new Array(8*8)
        for(let i=0;i<8;i++){
            for(let j=0;j<8;j++){
                this.squares[i*8+j]=new chessSquare(j+1, i+1)
            }
        }
        this.turn="white"
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
            new pawn("white", this, square.getCol.asIndex, square.getRow)
        }
        for(let square of this.squares.filter(element => element.getRow===7)){
            new pawn("black", this, square.getCol.asIndex, square.getRow)
        }

        new queen("white", this, "D", 1)
        new queen("black", this, "D", 8)

        new king("white", this, "E", 1)
        new king("black", this, "E", 8)

        new bishop("white", this, "C", 1)
        new bishop("white", this, "F", 1)
        new bishop("black", this, "C", 8)
        new bishop("black", this, "F", 8)

        new knight("white", this, "B", 1)
        new knight("white", this, "G", 1)
        new knight("black", this, "B", 8)
        new knight("black", this, "G", 8)

        new rook("white", this, "A", 1)
        new rook("white", this, "H", 1)
        new rook("black", this, "A", 8)
        new rook("black", this, "H", 8)

        this.turn="white"
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
    setTurn(playerColor: player): void{
        this.turn=playerColor
    }
    get getCheck(): boolean{
        return this.check
    }
    get getIsPositionLegal(): boolean{
        return this.isPositionLegal
    }
    get getTurn(): player{
        return this.turn
    }
}

class chessSquare{
    col : column
    row : number
    figure : chessFigure | undefined

    constructor(col: string | number, row : number) {
        this.setSquare(col, row)
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

    setSquare(col : string | number, row : number) : void{
        col=numRep(col)
        if(row < 1 || row > 8) throw new Error('Incorrect row index')
        this.row=row
        if(col < 1 || col > 8) throw new Error('Incorrect column index')
        this.col={asLetter:strRep(col), asIndex:col}
    }
}

class chessFigure{
    color : player
    square : chessSquare
    range : Array<chessSquare> | undefined
    constructor(color : player, board : chessGame, col : string | number, row : number) {
        let numberOfChecks=0
        let colorOfChecker=""
        this.color=color

        col=numRep(col)
        let figureSquare=board.getSquare(col, row)
        if(!figureSquare){
            throw new Error('Element of index '+col+row+' does not exist')
        }
        this.square=figureSquare
        this.square.figure=this

        for(let element of board.getSquares){
            if(!element.getFigure){
                continue
            }
            element.getFigure.updateRange(board)
            if(element.getFigure.getRange?.find(sqr => sqr.getFigure instanceof king)){
                numberOfChecks++
                colorOfChecker=element.getFigure.getColor
            }
            if(numberOfChecks > 1){
                board.setIsPositionLegal(false)
                board.setCheck(true)
            }else if(numberOfChecks === 1){
                board.setIsPositionLegal(board.getTurn !== colorOfChecker)
                board.setCheck(true)
            }else{
                board.setIsPositionLegal(true)
                board.setCheck(false)
            }
        }
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
        uprightRange=uprightRange.filter(element => !((element.getRow === max_row || element.getRow === min_row) && element.getFigure?.getColor === figure.getSquare.getFigure?.getColor))
        horizontalRange=horizontalRange.filter(element => !((element.getCol.asIndex === max_col || element.getCol.asIndex === min_col) && element.getFigure?.getColor === figure.getSquare.getFigure?.getColor))

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
        rightDiagonal=rightDiagonal.filter(element => !((element.getRow === maxRowRight || element.getRow === minRowRight) && element.getFigure?.getColor === figure.getColor))
        leftDiagonal=leftDiagonal.filter(element => !((element.getRow === maxRowLeft || element.getRow === minRowLeft) && element.getFigure?.getColor === figure.getColor))

        //merging the diagonals
        return rightDiagonal.concat(leftDiagonal)
    }
    updateRange(board : chessGame) : void{}
    get getColor() : player{
        return this.color
    }
    get getRange() : Array<chessSquare> | undefined{
        return this.range
    }
    get getSquare() : chessSquare{
        return this.square
    }
    move(board : chessGame, col : string | number, row : number){
    }
}

class pawn extends chessFigure{
    updateRange(board: chessGame){
        let baseRange : Array<chessSquare> | undefined
        let nonEmpty : chessSquare | undefined
        if(this.color==="white"){
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
                if(diagonal1.getFigure && diagonal1.getFigure.getColor==="black"){
                    baseRange.push(diagonal1)
                }
            }
            if(diagonal2!==undefined){
                if(diagonal2.getFigure && diagonal2.getFigure.getColor==="black"){
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
                if(diagonal1.getFigure && diagonal1.getFigure.getColor==="white"){
                    baseRange.push(diagonal1)
                }
            }
            if(diagonal2!==undefined){
                if(diagonal2.getFigure && diagonal2.getFigure.getColor==="white"){
                    baseRange.push(diagonal2)
                }
            }
        }
        this.range=baseRange
    }
}

class bishop extends chessFigure{
    updateRange(board : chessGame) {
        this.range=chessFigure.getDiagonalsArray(this, board)
    }
}

class knight extends chessFigure{
    updateRange(board : chessGame) {
        let row : number=this.getSquare.getRow
        let col : number=this.getSquare.getCol.asIndex

        let twoRowOneCol : Array<chessSquare> | undefined=board.getSquares.filter(element => Math.abs(element.getCol.asIndex - col) === 1 && Math.abs(element.getRow - row) === 2)
        let oneRowTwoCol : Array<chessSquare> | undefined=board.getSquares.filter(element => Math.abs(element.getRow - row) === 1 && Math.abs(element.getCol.asIndex - col) === 2)
        let merged : Array<chessSquare> | undefined=twoRowOneCol.concat(oneRowTwoCol)

        merged=merged.filter(element => !(element.getFigure && element.getFigure.getColor === this.getColor))
        this.range=merged
    }
}

class rook extends chessFigure{
    updateRange(board : chessGame) {
        this.range=chessFigure.getCrossPathArray(this, board)
    }
}

class queen extends chessFigure{
    updateRange(board : chessGame) {
        let diagonals : Array<chessSquare> | undefined=chessFigure.getDiagonalsArray(this, board)
        if(!diagonals){
            diagonals=[]
        }
        this.range=chessFigure.getCrossPathArray(this, board)?.concat(diagonals)
    }
}

class king extends chessFigure{
    updateRange(board : chessGame){
        this.range = board.getSquares.filter(element => (Math.abs(element.getRow - this.square.getRow) <= 1
            && Math.abs(element.getCol.asIndex - this.square.getCol.asIndex) <=1) && (!element.getFigure || element.getFigure.getColor !== this.getColor))
    }
}*/

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <ChessBoard state={new chessGame()}/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

/*
let game=new chessGame()
game.Initiate()
let a=new pawn(true, game, "E", 4)
console.log(a.getRange)*/
