import { gameReducer } from '../../src/reducers/gameReducer';
import { GameState, Action } from '../../src/types';

describe('gameReducer', () => {
  const initialState: GameState = {
    playerHand: { cards: [], value: 0 },
    houseHand: { cards: [], value: 0 },
    status: 'playing',
    deckId: null,
  };

  it('handles INITIALIZE_GAME action', () => {
    const action: Action = {
      type: 'INITIALIZE_GAME',
      payload: {
        playerCards: [{ value: 'KING', suit: 'HEARTS', code: 'KH', image: '' }],
        houseCards: [{ value: 'QUEEN', suit: 'SPADES', code: 'QS', image: '' }],
        deckId: 'new_deck_id',
      },
    };
    const newState = gameReducer(initialState, action);
    expect(newState.playerHand.cards.length).toBe(1);
    expect(newState.houseHand.cards.length).toBe(1);
    expect(newState.deckId).toBe('new_deck_id');
    expect(newState.status).toBe('playing');
  });

  it('handles HIT action', () => {
    const state: GameState = {
      ...initialState,
      playerHand: { cards: [{ value: 'KING', suit: 'HEARTS', code: 'KH', image: '' }], value: 10 },
      deckId: 'existing_deck_id',
    };
    const action: Action = {
      type: 'HIT',
      payload: { card: { value: 'ACE', suit: 'SPADES', code: 'AS', image: '' } },
    };
    const newState = gameReducer(state, action);
    expect(newState.playerHand.cards.length).toBe(2);
    expect(newState.playerHand.value).toBe(21);
    expect(newState.status).toBe('playing');
  });

  it('handles STAND action', () => {
    const state: GameState = {
      ...initialState,
      playerHand: { cards: [{ value: 'KING', suit: 'HEARTS', code: 'KH', image: '' }], value: 10 },
      houseHand: { cards: [{ value: 'QUEEN', suit: 'SPADES', code: 'QS', image: '' }], value: 10 },
    };
    const action: Action = { type: 'STAND' };
    const newState = gameReducer(state, action);
    expect(newState.status).toBe('tie');
  });

  it('returns the same state for unknown action', () => {
    const action: Action = { type: 'UNKNOWN_ACTION' as any };
    const newState = gameReducer(initialState, action);
    expect(newState).toEqual(initialState);
  });
});