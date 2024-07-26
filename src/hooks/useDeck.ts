import { useState, useCallback } from 'react';
import { deckService } from '../services/deckService';
import { Card } from '../types';

export const useDeck = () => {
  const [deckId, setDeckId] = useState<string | null>(null);

  const initializeDeck = useCallback(async () => {
    try {
      const newDeckId = await deckService.newDeck();
      setDeckId(newDeckId);
      return newDeckId;
    } catch (error) {
      console.error('Error initializing deck:', error);
      throw error;
    }
  }, []);

  const drawCards = useCallback(async (deckId: string, count: number): Promise<Card[]> => {
    const cards = await deckService.drawCards(deckId, count);
    console.log('Drawn cards:', cards);
    return cards;
  }, []);

  const shuffleDeck = useCallback(async () => {
    if (deckId) {
      await deckService.shuffleDeck(deckId);
    } else {
      console.error('Cannot shuffle deck: deckId is null');
    }
  }, [deckId]);

  return { deckId, setDeckId, initializeDeck, drawCards, shuffleDeck };
};