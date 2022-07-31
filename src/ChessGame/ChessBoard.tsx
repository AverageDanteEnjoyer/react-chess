import React, {useState} from "react";
import chessGame from "./API/chessGame";
import chessGameHistory from "./API/chessGameHistory";
import ChessSquareComponent from "./ChessSquareComponent";
import chessSquare from "./API/chessSquare";
import boardStyles from  './ChessBoard.module.css'
import {Container, Row, Col} from 'react-grid-system'
import chessFigure from "./API/chessFigure";

interface ChessBoardProps extends React.ComponentProps<any>{
    state : chessGame
}

function handleSelection(board: chessGame, square : chessSquare){
    board.getSquares.filter(element => element!==square).forEach(sq =>{ //all squares on the board but 'square'
        sq.setIsSelected=false
        sq.setIsHighlighted=false
    })
    square.setIsHighlighted=false

    if(board.getSelectedSquare){
        if(board.getSelectedSquare.getFigure?.move(board, square.getCol.asLetter, square.getRow)){
            board.selectedSquare=undefined
            square.setIsSelected=false
            return board
        }
    }

    board.setSelectedSquare=(square.getIsSelected ? square : undefined)
    if(board.getSelectedSquare?.getFigure?.getRange){
        board.getSelectedSquare.getFigure.getRange.forEach(element => {
            element.setIsHighlighted=true
        })
    }
    return board
}

function ChessBoard(props : ChessBoardProps){
    const [game, setGame] = useState(props.state)
    const [rerender, setRerender] = useState(true)


    const board = []
    for(let i=0;i<8;i++){
        const row=[]
        for(let j=0;j<8;j++){
            let squareAPI=game.getSquares[j*8+i]
            row.push(
                <ChessSquareComponent state={squareAPI} onClick={() => {
                    if(game.getIsWhitesTurn===squareAPI.getFigure?.getIsWhite){
                        squareAPI.setIsSelected=!squareAPI.getIsSelected
                    }
                    setGame((game:chessGame) => handleSelection(game, squareAPI));
                    setRerender(!rerender)
                }}/>
            )
        }
        board.push(<Row>{row}</Row>)
    }

    return (
            <Container>{board}</Container>
        )
}

export default ChessBoard