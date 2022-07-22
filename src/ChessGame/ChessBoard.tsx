import React from 'react';
import chessGame from "./API/chessGame";
import ChessSquareComponent from "./ChessSquareComponent";

interface ChessBoardProps extends React.ComponentProps<any>{
    state : chessGame
}

function ChessBoard(props : ChessBoardProps){
    props.state.Initiate()
    return (
            <ChessSquareComponent state={props.state.squares[0]}/>
        )
}

export default ChessBoard