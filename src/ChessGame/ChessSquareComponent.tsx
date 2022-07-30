import React, {useEffect, useState} from "react";
import {column} from "./utils";
import chessFigure from "./API/chessFigure";
import chessSquare from "./API/chessSquare";
import squareStyles from './ChessSquareComponent.module.css'
import {Container, Row, Col} from 'react-grid-system'

interface SquareProps extends React.ComponentProps<any>{
    state: chessSquare
}

function ChessSquareComponent(props : SquareProps){
    let backgroundColor: string = props.state.getIsWhite ? '#EADAB9' : '#C2A482';
    let borderRadius: string = props.state.isHighlighted ? '10px' : '0px'
    let boxShadow : string = props.state.isHighlighted ?  'inset -5px -5px 9px rgba(255,255,255,0.45), inset 5px 5px 9px rgba(94,104,121,0.3)' : 'none'
    let backgroundImage : string = props.state.isHighlighted ? "url('https://upload.wikimedia.org/wikipedia/commons/c/c0/Location_dot_black.svg')" : "url('"+props.state.getFigure?.getIconUrl+"')"
    let backgroundSize : string = props.state.isHighlighted ? '15%' : 'cover'

    return (
        <Col sm={1} className={squareStyles.square} style={Object.assign({},
            {backgroundColor: backgroundColor},
            {backgroundImage : backgroundImage},
            {borderRadius : borderRadius},
            {boxShadow : boxShadow},
            {backgroundSize : backgroundSize})}
             onClick={() => props.onClick()}>
            {props.value}
        </Col>
    )
}

export default ChessSquareComponent