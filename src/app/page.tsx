'use client';

import React from 'react';
import { useBlackjack } from '../hooks/useBlackjack';
import Hand from '../components/Hand';
import ActionButtons from '../components/ActionButtons';
import GameStatus from '../components/GameStatus';

export default function Home() {
  const { gameState, hit, stand, initializeGame } = useBlackjack();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm">
        <h1 className="text-4xl font-bold text-center mb-8">Blackjack</h1>
        
        <Hand hand={gameState.playerHand} title="Your Hand" />
        <Hand hand={gameState.houseHand} title="House Hand" />
        
        <ActionButtons
          onHit={hit}
          onStand={stand}
          disabled={gameState.status !== 'playing'}
        />
        
        <GameStatus
          status={gameState.status}
          onNewGame={initializeGame}
        />
      </div>
    </main>
  );
}