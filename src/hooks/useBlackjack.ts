

import { useState, useEffect, useCallback } from 'react';
import { GameState, Card, Hand, GameStatus } from '../types';
import { deckService } from '../services/deckService';

const initialState: GameState = {
  playerHand: { cards: [], value: 0 },
  houseHand: { cards: [], value: 0 },
  status: 'playing',
  deckId: null,
};

export const useBlackjack = () => {
  const [gameState, setGameState] = useState<GameState>(initialState);

  const calculateHandValue = (hand: Card[]): number => {
    let value = 0;
    let aceCount = 0;

    for (const card of hand) {
      if (card.value === 'ACE') {
        aceCount++;
        value += 11;
      } else if (['KING', 'QUEEN', 'JACK'].includes(card.value)) {
        value += 10;
      } else {
        value += parseInt(card.value);
      }
    }

    while (value > 21 && aceCount > 0) {
      value -= 10;
      aceCount--;
    }

    return value;
  };

  const updateGameStatus = useCallback((playerValue: number, houseValue: number): GameStatus => {
    if (playerValue > 21) return 'houseWon';
    if (playerValue === 21 && houseValue !== 21) return 'playerWon';
    if (playerValue > houseValue) return 'playerWon';
    if (playerValue < houseValue) return 'houseWon';
    return 'tie';
  }, []);

  const initializeGame = useCallback(async () => {
    const deckId = await deckService.newDeck();
    const playerCards = await deckService.drawCards(deckId, 2);
    const houseCards = await deckService.drawCards(deckId, 2);

    const playerValue = calculateHandValue(playerCards);
    const houseValue = calculateHandValue(houseCards);

    setGameState({
      playerHand: { cards: playerCards, value: playerValue },
      houseHand: { cards: houseCards, value: houseValue },
      status: updateGameStatus(playerValue, houseValue),
      deckId,
    });
  }, [updateGameStatus]);

  const hit = useCallback(async () => {
    if (!gameState.deckId || gameState.status !== 'playing') return;

    const [newCard] = await deckService.drawCards(gameState.deckId, 1);
    const updatedPlayerHand = [...gameState.playerHand.cards, newCard];
    const playerValue = calculateHandValue(updatedPlayerHand);

    setGameState((prevState) => ({
      ...prevState,
      playerHand: { cards: updatedPlayerHand, value: playerValue },
      status: updateGameStatus(playerValue, prevState.houseHand.value),
    }));
  }, [gameState, updateGameStatus]);

  const stand = useCallback(() => {
    setGameState((prevState) => ({
      ...prevState,
      status: updateGameStatus(prevState.playerHand.value, prevState.houseHand.value),
    }));
  }, [updateGameStatus]);

  useEffect(() => {
    initializeGame();
  }, [initializeGame]);

  return {
    gameState,
    hit,
    stand,
    initializeGame,
  };
};