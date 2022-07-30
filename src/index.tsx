import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';

import chessGame from "./ChessGame/API/chessGame";
import chessGameHistory from "./ChessGame/API/chessGameHistory";

import bishop from "./ChessGame/API/Figures/bishop";
import pawn from "./ChessGame/API/Figures/pawn";
import ChessBoard from "./ChessGame/ChessBoard";
import chessFrame from "./ChessGame/ChessFrame";
import ChessFrame from "./ChessGame/ChessFrame";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <ChessFrame/>
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
