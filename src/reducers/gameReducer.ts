import { GameState, Action } from '../types';
import { GameEngine } from '../utils/GameEngine';

const gameEngine = new GameEngine();

export function gameReducer(state: GameState, action: Action): GameState {
  switch (action.type) {
    case 'INITIALIZE_GAME': {
      const { playerCards, houseCards, deckId } = action.payload;
      const playerValue = gameEngine.calculateHandValue(playerCards);
      const houseValue = gameEngine.calculateHandValue(houseCards);
      const status = gameEngine.isBlackjack(playerCards) ? 'playerWon' : 'playing';

      return {
        playerHand: { cards: playerCards, value: playerValue },
        houseHand: { cards: houseCards, value: houseValue },
        status,
        deckId,
      };
    }

    case 'HIT': {
      const updatedPlayerHand = [...state.playerHand.cards, action.payload.card];
      const playerValue = gameEngine.calculateHandValue(updatedPlayerHand);
      const status = playerValue > 21 ? 'houseWon' : 'playing';

      return {
        ...state,
        playerHand: { cards: updatedPlayerHand, value: playerValue },
        status,
      };
    }

    case 'STAND': {
      return {
        ...state,
        status: gameEngine.determineGameStatus(state.playerHand.value, state.houseHand.value),
      };
    }

    default:
      return state;
  }
}