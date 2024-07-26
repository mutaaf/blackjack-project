import { renderHook, act } from '@testing-library/react';
import { useBlackjack } from '../../src/hooks/useBlackjack';
import { useDeck } from '../../src/hooks/useDeck';
import { GameEngine } from '../../src/utils/GameEngine';

jest.mock('../../src/hooks/useDeck');
jest.mock('../../src/utils/GameEngine');

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
    const mockDrawCards = jest.fn()
      .mockResolvedValueOnce([{ value: '10', suit: 'HEARTS', code: '10H', image: '' }, { value: 'KING', suit: 'SPADES', code: 'KS', image: '' }])
      .mockResolvedValueOnce([{ value: '6', suit: 'HEARTS', code: '6H', image: '' }, { value: '5', suit: 'SPADES', code: '5S', image: '' }])
      .mockResolvedValueOnce([{ value: 'KING', suit: 'DIAMONDS', code: 'KD', image: '' }]);

    (useDeck as jest.Mock).mockReturnValue({
      deckId: 'test-deck-id',
      initializeDeck: jest.fn().mockResolvedValue('test-deck-id'),
      drawCards: mockDrawCards,
    });

    const mockCalculateHandValue = jest.fn()
      .mockReturnValueOnce(20)  // Player's hand
      .mockReturnValueOnce(11)  // Initial dealer hand
      .mockReturnValueOnce(21); // After dealer hit

    (GameEngine as jest.Mock).mockImplementation(() => ({
      calculateHandValue: mockCalculateHandValue,
    }));

    const { result } = renderHook(() => useBlackjack());

    await act(async () => {
      await result.current.initializeGame();
    });

    await act(async () => {
      await result.current.stand();
    });

    expect(result.current.gameState.status).not.toBe('playing');
    expect(result.current.gameState.houseHand.cards.length).toBe(3);
  });

  it('dealer hits until 17 or higher', async () => {
    const mockDrawCards = jest.fn()
      .mockResolvedValueOnce([{ value: '10', suit: 'HEARTS', code: '10H', image: '' }, { value: '9', suit: 'SPADES', code: '9S', image: '' }])
      .mockResolvedValueOnce([{ value: '6', suit: 'HEARTS', code: '6H', image: '' }, { value: '5', suit: 'SPADES', code: '5S', image: '' }])
      .mockResolvedValueOnce([{ value: 'KING', suit: 'DIAMONDS', code: 'KD', image: '' }]);

    (useDeck as jest.Mock).mockReturnValue({
      deckId: 'test-deck-id',
      initializeDeck: jest.fn().mockResolvedValue('test-deck-id'),
      drawCards: mockDrawCards,
    });

    const mockCalculateHandValue = jest.fn()
      .mockReturnValueOnce(19)  // Player's hand
      .mockReturnValueOnce(11)  // Initial dealer hand
      .mockReturnValueOnce(21); // After dealer hit

    (GameEngine as jest.Mock).mockImplementation(() => ({
      calculateHandValue: mockCalculateHandValue,
    }));

    const { result } = renderHook(() => useBlackjack());

    await act(async () => {
      await result.current.initializeGame();
    });

    await act(async () => {
      await result.current.stand();
    });

    console.log('Game state after dealer play:', result.current.gameState);

    expect(result.current.gameState.houseHand.cards.length).toBe(3);
    expect(mockDrawCards).toHaveBeenCalledTimes(3);  // 2 initial draws + 1 dealer hit
    expect(mockCalculateHandValue).toHaveBeenCalledTimes(3);  // Player, initial house, house after hit
    expect(result.current.gameState.status).toBe('houseWon');
  });
});