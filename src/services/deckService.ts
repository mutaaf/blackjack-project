import axios from 'axios';
import { Card } from '../types';

const API_BASE_URL = 'https://deckofcardsapi.com/api/deck';

export const deckService = {
  async newDeck(): Promise<string> {
    try {
      const response = await axios.get(`${API_BASE_URL}/new/shuffle/?deck_count=1`);
      return response.data.deck_id;
    } catch (error) {
      console.error('Error creating new deck:', error);
      throw error;
    }
  },

  async drawCards(deckId: string, count: number): Promise<Card[]> {
    try {
      const response = await axios.get(`${API_BASE_URL}/${deckId}/draw/?count=${count}`);
      return response.data.cards;
    } catch (error) {
      console.error('Error drawing cards:', error);
      throw error;
    }
  },

  async shuffleDeck(deckId: string): Promise<void> {
    try {
      await axios.get(`${API_BASE_URL}/${deckId}/shuffle/`);
    } catch (error) {
      console.error('Error shuffling deck:', error);
      throw error;
    }
  },
};