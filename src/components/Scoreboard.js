import React from 'react';

const Scoreboard = ({ playerXScore, playerOScore }) => (
  <div>
    <p>Player X Score: {playerXScore}</p>
    <p>Player O Score: {playerOScore}</p>
  </div>
);

export default Scoreboard;
