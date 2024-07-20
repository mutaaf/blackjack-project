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
    try {
      return await deckService.drawCards(deckId, count);
    } catch (error) {
      console.error('Error drawing cards:', error);
      throw error;
    }
  }, []);

  const shuffleDeck = useCallback(async () => {
    if (deckId) {
      try {
        await deckService.shuffleDeck(deckId);
      } catch (error) {
        console.error('Error shuffling deck:', error);
        throw error;
      }
    } else {
      console.error('Cannot shuffle deck: deckId is null');
    }
  }, [deckId]);

  return { deckId, setDeckId, initializeDeck, drawCards, shuffleDeck };
};