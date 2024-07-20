import React from 'react';
import Hand from './Hand';
import ActionButtons from './ActionButtons';
import GameStatus from './GameStatus';
import { GameState } from '../types';

interface GameBoardProps {
  gameState: GameState;
  onHit: () => void;
  onStand: () => void;
  onNewGame: () => void;
}

const GameBoard: React.FC<GameBoardProps> = ({ gameState, onHit, onStand, onNewGame }) => {
  return (
    <div className="card-table p-4">
      <Hand hand={gameState.playerHand} title="Your Hand" />
      <Hand hand={gameState.houseHand} title="House Hand" />
      <ActionButtons
        onHit={onHit}
        onStand={onStand}
        disabled={gameState.status !== 'playing'}
      />
      <GameStatus
        status={gameState.status}
        onNewGame={onNewGame}
      />
    </div>
  );
};

export default GameBoard;