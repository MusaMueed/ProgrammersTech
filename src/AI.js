const calculateNextMove = (squares) => {
  // Check if AI can win in the next move
  for (let i = 0; i < squares.length; i++) {
    if (squares[i] === null) {
      const squaresCopy = squares.slice();
      squaresCopy[i] = 'O';
      if (calculateWinner(squaresCopy)) {
        return i;
      }
    }
  }

  // Check if player can win in the next move, and block if necessary
  for (let i = 0; i < squares.length; i++) {
    if (squares[i] === null) {
      const squaresCopy = squares.slice();
      squaresCopy[i] = 'X';
      if (calculateWinner(squaresCopy)) {
        return i;
      }
    }
  }

  // If no winning moves, make a random move
  const emptySquares = [];
  for (let i = 0; i < squares.length; i++) {
    if (squares[i] === null) {
      emptySquares.push(i);
    }
  }
  const randomIndex = Math.floor(Math.random() * emptySquares.length);
  return emptySquares[randomIndex];
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

export default calculateNextMove;
