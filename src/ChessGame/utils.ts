import chessSquare from "./API/chessSquare";

export interface column{
    asLetter: string
    asIndex: number
}

export function numRep(string: string | number): number{
    if(typeof(string)=="string"){
        return string.charCodeAt(0)-'A'.charCodeAt(0)+1
    }else return string
}
export function strRep(number: string | number): string{
    if(typeof number=="number"){
        return String.fromCharCode(number+'A'.charCodeAt(0)-1)
    }else return number
}
export function matchSquare(element : chessSquare, col : string | number, row : number) : boolean{
    col=numRep(col)
    return (element.getRow===row && element.getCol.asIndex===col)
}