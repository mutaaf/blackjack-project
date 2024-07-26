import { renderHook, act } from '@testing-library/react';
import { useDeck } from '../../src/hooks/useDeck';
import { deckService } from '../../src/services/deckService';

jest.mock('../../src/services/deckService');

describe('useDeck', () => {
  beforeEach(() => {
    jest.resetAllMocks();
    console.error = jest.fn();
  });

  it('initializes with null deckId', () => {
    const { result } = renderHook(() => useDeck());
    expect(result.current.deckId).toBeNull();
  });

  it('initializes a new deck and updates deckId', async () => {
    (deckService.newDeck as jest.Mock).mockResolvedValue('new_deck_id');

    const { result } = renderHook(() => useDeck());

    await act(async () => {
      await result.current.initializeDeck();
    });

    expect(result.current.deckId).toBe('new_deck_id');
  });

  it('handles errors when initializing a new deck', async () => {
    (deckService.newDeck as jest.Mock).mockRejectedValue(new Error('API Error'));

    const { result } = renderHook(() => useDeck());

    await act(async () => {
      await expect(result.current.initializeDeck()).rejects.toThrow('API Error');
    });

    expect(result.current.deckId).toBeNull();
    expect(console.error).toHaveBeenCalledWith('Error initializing deck:', expect.any(Error));
  });

  it('does not shuffle when deckId is null', async () => {
    const { result } = renderHook(() => useDeck());

    await act(async () => {
      await result.current.shuffleDeck();
    });

    expect(deckService.shuffleDeck).not.toHaveBeenCalled();
    expect(console.error).toHaveBeenCalledWith('Cannot shuffle deck: deckId is null');
  });

  it('draws cards from the deck', async () => {
    const mockCards = [
      { value: 'KING', suit: 'HEARTS', code: 'KH', image: '' },
      { value: 'ACE', suit: 'SPADES', code: 'AS', image: '' },
    ];
    (deckService.drawCards as jest.Mock).mockResolvedValue(mockCards);

    const { result } = renderHook(() => useDeck());

    let drawnCards;
    await act(async () => {
      drawnCards = await result.current.drawCards('test_deck_id', 2);
    });

    expect(drawnCards).toEqual(mockCards);
    expect(deckService.drawCards).toHaveBeenCalledWith('test_deck_id', 2);
  });

  it('shuffles the deck when deckId is available', async () => {
    (deckService.shuffleDeck as jest.Mock).mockResolvedValue(undefined);

    const { result } = renderHook(() => useDeck());

    act(() => {
      result.current.setDeckId('test_deck_id');
    });

    await act(async () => {
      await result.current.shuffleDeck();
    });

    expect(deckService.shuffleDeck).toHaveBeenCalledWith('test_deck_id');
  });

  it('does not shuffle when deckId is null', async () => {
    const { result } = renderHook(() => useDeck());

    await act(async () => {
      await result.current.shuffleDeck();
    });

    expect(deckService.shuffleDeck).not.toHaveBeenCalled();
    expect(console.error).toHaveBeenCalledWith('Cannot shuffle deck: deckId is null');
  });
});