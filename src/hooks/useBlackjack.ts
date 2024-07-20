import { useReducer, useCallback, useEffect } from 'react';
import { GameState, Card } from '../types';
import { GameEngine } from '../utils/GameEngine';
import { gameReducer } from '../reducers/gameReducer';
import { useDeck } from './useDeck';

const initialState: GameState = {
  playerHand: { cards: [], value: 0 },
  houseHand: { cards: [], value: 0 },
  status: 'playing',
  deckId: null,
};

export const useBlackjack = () => {
  const [gameState, dispatch] = useReducer(gameReducer, initialState);
  const { deckId, initializeDeck, drawCards } = useDeck();
  const gameEngine = new GameEngine();

  const initializeGame = useCallback(async () => {
    const newDeckId = await initializeDeck();
    const playerCards = await drawCards(newDeckId, 2);
    const houseCards = await drawCards(newDeckId, 2);

    dispatch({
      type: 'INITIALIZE_GAME',
      payload: { playerCards, houseCards, deckId: newDeckId },
    });
  }, [initializeDeck, drawCards]);

  const hit = useCallback(async () => {
    if (gameState.status !== 'playing' || !gameState.deckId) return;

    const [newCard] = await drawCards(gameState.deckId, 1);
    dispatch({ type: 'HIT', payload: { card: newCard } });
  }, [gameState.status, gameState.deckId, drawCards]);

  const stand = useCallback(() => {
    dispatch({ type: 'STAND' });
  }, []);

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