import React, { useState, useEffect } from 'react';
import Board from './components/Board';
import Scoreboard from './components/Scoreboard';
import calculateNextMove from './AI';
import './App.css';

const App = () => {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [playerXScore, setPlayerXScore] = useState(0);
  const [playerOScore, setPlayerOScore] = useState(0);

  const handleClick = (i) => {
    const newSquares = squares.slice();
    if (calculateWinner(newSquares) || newSquares[i]) {
      return;
    }
    newSquares[i] = xIsNext ? 'X' : 'O';
    setSquares(newSquares);
    setXIsNext(!xIsNext);
  };

  useEffect(() => {
    const winner = calculateWinner(squares);
    if (winner) {
      winner === 'X' ? setPlayerXScore(playerXScore + 1) : setPlayerOScore(playerOScore + 1);
      setTimeout(handleRestart, 1000);
    } else if (!squares.includes(null)) {
      setTimeout(handleRestart, 1000);
    } else if (!xIsNext) {
      setTimeout(() => {
        const nextMove = calculateNextMove(squares);
        handleClick(nextMove);
      }, 500);
    }
  }, [squares, xIsNext]);

  const handleRestart = () => {
    setSquares(Array(9).fill(null));
  };

  return (
    <div className="game">
      <div className="game-board">
        <Board squares={squares} onClick={handleClick} />
      </div>
      <div className="game-info">
        <Scoreboard playerXScore={playerXScore} playerOScore={playerOScore} />
      </div>
    </div>
  );
};

// Function to determine the winner
const calculateWinner = (squares) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
};

export default App;
