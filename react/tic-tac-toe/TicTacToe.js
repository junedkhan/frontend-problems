import React, { useState, useEffect, useCallback } from 'react';
import './TicTacToe.css';

// Minimax Algorithm for optimal bot move
const minimax = (board, depth, isMaximizingPlayer) => {
  const winner = checkWinner(board);
  if (winner) return winner === 'O' ? 10 - depth : depth - 10;
  if (board.every(cell => cell !== null)) return 0; // draw

  if (isMaximizingPlayer) {
    let best = -Infinity;
    for (let i = 0; i < board.length; i++) {
      if (board[i] === null) {
        board[i] = 'O'; // Bot's move
        best = Math.max(best, minimax(board, depth + 1, false));
        board[i] = null;
      }
    }
    return best;
  } else {
    let best = Infinity;
    for (let i = 0; i < board.length; i++) {
      if (board[i] === null) {
        board[i] = 'X'; // User's move
        best = Math.min(best, minimax(board, depth + 1, true));
        board[i] = null;
      }
    }
    return best;
  }
};

// Bot's optimal move using Minimax
const getBestMove = (board) => {
  let bestVal = -Infinity;
  let bestMove = -1;

  for (let i = 0; i < board.length; i++) {
    if (board[i] === null) {
      board[i] = 'O'; // Bot's move
      let moveVal = minimax(board, 0, false);
      board[i] = null;
      if (moveVal > bestVal) {
        bestMove = i;
        bestVal = moveVal;
      }
    }
  }
  return bestMove;
};

// Checking for winner
const checkWinner = (board) => {
  const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
    [0, 4, 8], [2, 4, 6], // diagonals
  ];

  for (let pattern of winPatterns) {
    const [a, b, c] = pattern;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }

  return board.includes(null) ? null : 'draw'; // No winner and no empty cells -> draw
};

const TicTacToe = ({ boardIndex }) => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isUserTurn, setIsUserTurn] = useState(true);
  const [gameStatus, setGameStatus] = useState('Your Turn');
  const [gameOver, setGameOver] = useState(false);

  // User's click handler
  const handleClick = (index) => {
    if (board[index] || gameOver) return;
    const newBoard = [...board];
    newBoard[index] = 'X';
    setBoard(newBoard);
    setIsUserTurn(false);
  };

  // Bot's move logic
  const botMove = useCallback(() => {
    const bestMove = getBestMove(board);
    const newBoard = [...board];
    newBoard[bestMove] = 'O';
    setBoard(newBoard);
    setIsUserTurn(true);
  }, [board]);

  // Check winner on every board state change
  useEffect(() => {
    const winner = checkWinner(board);
    if (winner) {
      if (winner === 'X') {
        setGameStatus('You Win!');
      } else if (winner === 'O') {
        setGameStatus('Bot Wins!');
      } else {
        setGameStatus('It\'s a Draw!');
      }
      setGameOver(true);
    } else {
      setGameStatus(isUserTurn ? 'Your Turn' : 'Bot\'s Turn');
      if (!isUserTurn && !gameOver) botMove();
    }
  }, [board, isUserTurn, botMove]);

  // Render the board squares
  const renderSquare = (index) => (
    <button className="square" onClick={() => handleClick(index)}>
      {board[index]}
    </button>
  );

  return (
    <div className="game-board">
      <h2>Board #{boardIndex}</h2>
      <div className="status">{gameStatus}</div>
      <div className="board">
        {[...Array(9)].map((_, index) => (
          <div key={index} className="square-container">
            {renderSquare(index)}
          </div>
        ))}
      </div>
    </div>
  );
};

export default React.memo(TicTacToe);
