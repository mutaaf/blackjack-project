'use client';

import React from 'react';
import { useBlackjack } from '../hooks/useBlackjack';
import GameBoard from '../components/GameBoard';

export default function Home() {
  const { gameState, hit, stand, initializeGame } = useBlackjack();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-4xl font-bold text-center mb-8">Blackjack</h1>
      <GameBoard
        gameState={gameState}
        onHit={hit}
        onStand={stand}
        onNewGame={initializeGame}
      />
    </main>
  );
}