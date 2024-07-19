import React from 'react';
import { GameStatus as GameStatusType } from '../types';

interface GameStatusProps {
  status: GameStatusType;
  onNewGame: () => void;
}

const GameStatus: React.FC<GameStatusProps> = ({ status, onNewGame }) => {
  let message = '';
  let color = '';

  switch (status) {
    case 'playerWon':
      message = 'You won!';
      color = 'text-green-600';
      break;
    case 'houseWon':
      message = 'House won!';
      color = 'text-red-600';
      break;
    case 'tie':
      message = 'It\'s a tie!';
      color = 'text-yellow-600';
      break;
    default:
      return null;
  }

  return (
    <div className="text-center mt-4">
      <h2 className={`text-2xl font-bold ${color}`}>{message}</h2>
      <button
        onClick={onNewGame}
        className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded mt-2"
      >
        New Game
      </button>
    </div>
  );
};

export default GameStatus;