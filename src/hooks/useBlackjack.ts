import { useState, useCallback } from 'react';
import { GameState, Card } from '../types';
import { useDeck } from './useDeck';
import { GameEngine } from '../utils/GameEngine';

const initialState: GameState = {
  playerHand: { cards: [], value: 0 },
  houseHand: { cards: [], value: 0 },
  status: 'playing',
  deckId: null,
};

export const useBlackjack = () => {
  const [gameState, setGameState] = useState<GameState>(initialState);
  const { deckId, setDeckId, initializeDeck, drawCards } = useDeck();
  const gameEngine = new GameEngine();

  const initializeGame = useCallback(async () => {
    const newDeckId = await initializeDeck();
    const playerCards = await drawCards(newDeckId, 2);
    const houseCards = await drawCards(newDeckId, 2);

    const playerValue = gameEngine.calculateHandValue(playerCards);
    const houseValue = gameEngine.calculateHandValue(houseCards);

    console.log('Initializing game:', { playerCards, houseCards });

    setGameState({
      playerHand: { cards: playerCards, value: playerValue },
      houseHand: { cards: houseCards, value: houseValue },
      status: 'playing',
      deckId: newDeckId,
    });
  }, [initializeDeck, drawCards, gameEngine]);

  const hit = useCallback(async () => {
    if (gameState.status !== 'playing' || !gameState.deckId) return;

    const [newCard] = await drawCards(gameState.deckId, 1);
    const updatedPlayerHand = [...gameState.playerHand.cards, newCard];
    const playerValue = gameEngine.calculateHandValue(updatedPlayerHand);

    console.log('Hit:', { newCard, updatedPlayerHand });

    setGameState((prevState) => ({
      ...prevState,
      playerHand: { cards: updatedPlayerHand, value: playerValue },
      status: playerValue > 21 ? 'houseWon' : 'playing',
    }));
  }, [gameState, drawCards, gameEngine]);

  const dealerPlay = useCallback(async (): Promise<{ currentHouseHand: Card[]; houseValue: number; status: GameState['status'] } | undefined> => {
    if (!gameState.deckId) return undefined;

    let currentHouseHand = [...gameState.houseHand.cards];
    let houseValue = gameEngine.calculateHandValue(currentHouseHand);

    console.log('Dealer play start:', { currentHouseHand, houseValue });

    while (houseValue < 17) {
      const [newCard] = await drawCards(gameState.deckId, 1);
      currentHouseHand = [...currentHouseHand, newCard];
      houseValue = gameEngine.calculateHandValue(currentHouseHand);
      console.log('Dealer hit:', { newCard, currentHouseHand, houseValue });
    }

    console.log('Dealer play end:', { currentHouseHand, houseValue });

    const playerValue = gameState.playerHand.value;
    let status: GameState['status'];

    if (houseValue > 21) {
      status = 'playerWon';
    } else if (houseValue > playerValue) {
      status = 'houseWon';
    } else if (houseValue < playerValue) {
      status = 'playerWon';
    } else {
      status = 'tie';
    }

    return { currentHouseHand, houseValue, status };
  }, [gameState, drawCards, gameEngine]);

  const stand = useCallback(async () => {
    const result = await dealerPlay();
    if (result) {
      const { currentHouseHand, houseValue, status } = result;
      setGameState((prevState) => ({
        ...prevState,
        houseHand: { cards: currentHouseHand, value: houseValue },
        status,
      }));
    }
  }, [dealerPlay]);

  return {
    gameState,
    hit,
    stand,
    initializeGame,
  };
};