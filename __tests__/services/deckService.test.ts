import axios from 'axios';
import { deckService } from '../../src/services/deckService';

jest.mock('axios');

describe('deckService', () => {
  const originalConsoleError = console.error;
  beforeEach(() => {
    console.error = jest.fn();
  });

  afterEach(() => {
    console.error = originalConsoleError;
  });

  describe('newDeck', () => {
    it('returns a deck ID', async () => {
      (axios.get as jest.Mock).mockResolvedValue({ data: { deck_id: 'new_deck_id' } });

      const deckId = await deckService.newDeck();
      expect(deckId).toBe('new_deck_id');
    });

    it('throws an error when API call fails', async () => {
      (axios.get as jest.Mock).mockRejectedValue(new Error('API Error'));

      await expect(deckService.newDeck()).rejects.toThrow('API Error');
    });
  });

  describe('drawCards', () => {
    it('returns an array of cards', async () => {
      const mockCards = [
        { value: 'KING', suit: 'HEARTS', code: 'KH', image: '' },
        { value: 'ACE', suit: 'SPADES', code: 'AS', image: '' },
      ];
      (axios.get as jest.Mock).mockResolvedValue({ data: { cards: mockCards } });

      const cards = await deckService.drawCards('test_deck_id', 2);
      expect(cards).toEqual(mockCards);
    });

    it('throws an error when API call fails', async () => {
      (axios.get as jest.Mock).mockRejectedValue(new Error('API Error'));

      await expect(deckService.drawCards('test_deck_id', 2)).rejects.toThrow('API Error');
    });
  });

  describe('shuffleDeck', () => {
    it('successfully shuffles the deck', async () => {
      (axios.get as jest.Mock).mockResolvedValue({ data: { success: true } });

      await expect(deckService.shuffleDeck('test_deck_id')).resolves.not.toThrow();
    });

    it('throws an error when API call fails', async () => {
      (axios.get as jest.Mock).mockRejectedValue(new Error('API Error'));

      await expect(deckService.shuffleDeck('test_deck_id')).rejects.toThrow('API Error');
    });
  });
});