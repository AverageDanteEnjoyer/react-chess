import chessGame from "./chessGame";

class chessGameHistory{
    history : Array<chessGame>
    constructor() {
        this.history=[]
    }
    handleGameChange(changedGame: chessGame): void{
        this.history.concat(changedGame)
    }

    get getHistory(): Array<chessGame>{
        return this.history
    }
    get getCurrentGame(): chessGame{
        return this.history[this.history.length-1]
    }
}

export default chessGameHistory