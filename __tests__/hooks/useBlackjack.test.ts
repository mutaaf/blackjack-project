import { renderHook, act } from '@testing-library/react';
import { useBlackjack } from '../../src/hooks/useBlackjack';
import { useDeck } from '../../src/hooks/useDeck';

jest.mock('../../src/hooks/useDeck');

describe('useBlackjack', () => {
  beforeEach(() => {
    (useDeck as jest.Mock).mockReturnValue({
      initializeDeck: jest.fn().mockResolvedValue('new_deck_id'),
      drawCards: jest.fn().mockResolvedValue([
        { value: '10', suit: 'HEARTS', code: '10H', image: '' },
        { value: 'KING', suit: 'SPADES', code: 'KS', image: '' },
      ]),
    });
  });

  it('initializes game correctly', async () => {
    const { result } = renderHook(() => useBlackjack());

    await act(async () => {
      await result.current.initializeGame();
    });

    expect(result.current.gameState.deckId).toBe('new_deck_id');
    expect(result.current.gameState.playerHand.cards.length).toBe(2);
    expect(result.current.gameState.houseHand.cards.length).toBe(2);
    expect(result.current.gameState.status).toBe('playing');
  });

  it('handles hit action correctly', async () => {
    const { result } = renderHook(() => useBlackjack());

    await act(async () => {
      await result.current.initializeGame();
    });

    await act(async () => {
      await result.current.hit();
    });

    expect(result.current.gameState.playerHand.cards.length).toBe(3);
  });

  it('handles stand action correctly', async () => {
    const { result } = renderHook(() => useBlackjack());

    await act(async () => {
      await result.current.initializeGame();
    });

    act(() => {
      result.current.stand();
    });

    expect(result.current.gameState.status).not.toBe('playing');
  });
});