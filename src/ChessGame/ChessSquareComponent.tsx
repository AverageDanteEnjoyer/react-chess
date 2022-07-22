import React from "react";
import {column} from "./utils";
import chessFigure from "./API/chessFigure";
import chessSquare from "./API/chessSquare";

interface SquareProps extends React.ComponentProps<any>{
    state: chessSquare
}

const boardSquareStyles = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    fontSize: '5vw'
}

function ChessSquareComponent(props : SquareProps){
    let backgroundColor: string = props.state.getIsWhite ? '#EADAB9' : '#C2A482';

    return (
        <div style={Object.assign({}, boardSquareStyles, {backgroundColor: backgroundColor})}
             onClick={props.onClick}>
            Right Here
        </div>
    )
}

export default ChessSquareComponent