import React, { useState } from 'react';
import TicTacToe from './TicTacToe';
import './App.css';

function App() {
  const [numBoards, setNumBoards] = useState(1);

  // Handle number of boards change
  const handleBoardChange = (e) => {
    setNumBoards(Number(e.target.value));
  };

  return (
    <div className="App">
      <h1>Optimized Tic-Tac-Toe Game</h1>
      <div className="input-container">
        <label>Number of Boards: </label>
        <input
          type="number"
          min="1"
          max="5"
          value={numBoards}
          onChange={handleBoardChange}
        />
      </div>

      {/* Render TicTacToe component dynamically */}
      <div className="board-container">
        {[...Array(numBoards)].map((_, index) => (
          <TicTacToe key={index} boardIndex={index + 1} />
        ))}
      </div>
    </div>
  );
}

export default App;
