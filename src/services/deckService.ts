import axios from 'axios';
import { Card } from '../types';

const API_BASE_URL = 'https://deckofcardsapi.com/api/deck';

export const deckService = {
  async newDeck(): Promise<string> {
    const response = await axios.get(`${API_BASE_URL}/new/shuffle/?deck_count=1`);
    return response.data.deck_id;
  },

  async drawCards(deckId: string, count: number): Promise<Card[]> {
    const response = await axios.get(`${API_BASE_URL}/${deckId}/draw/?count=${count}`);
    return response.data.cards;
  },

  async shuffleDeck(deckId: string): Promise<void> {
    await axios.get(`${API_BASE_URL}/${deckId}/shuffle/`);
  },
};