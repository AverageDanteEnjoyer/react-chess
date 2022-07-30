import ChessBoard from "./ChessBoard";
import React from "react";
import frameStyles from './ChessFrame.module.css'
import chessGame from "./API/chessGame";
import {Container, Row, Col} from 'react-grid-system'

interface ChessFrameProps extends React.ComponentProps<any>{

}

function ChessFrame(props : ChessFrameProps){
    return (
        <Container className={frameStyles.frame}>
            <ChessBoard state={new chessGame()}/>
        </Container>
    )
}

export default ChessFrame