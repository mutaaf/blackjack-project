import { Card, GameStatus } from '../types';

export class GameEngine {
  calculateHandValue(hand: Card[]): number {
    let value = 0;
    let aceCount = 0;

    for (const card of hand) {
      if (card.value === 'ACE') {
        aceCount++;
        value += 11;
      } else if (['KING', 'QUEEN', 'JACK'].includes(card.value)) {
        value += 10;
      } else {
        value += parseInt(card.value);
      }
    }

    while (value > 21 && aceCount > 0) {
      value -= 10;
      aceCount--;
    }

    return value;
  }

  determineGameStatus(playerValue: number, houseValue: number): GameStatus {
    if (playerValue > 21) return 'houseWon';
    if (houseValue > 21) return 'playerWon';
    if (playerValue > houseValue) return 'playerWon';
    if (playerValue < houseValue) return 'houseWon';
    return 'tie';
  }

  isBlackjack(hand: Card[]): boolean {
    return hand.length === 2 && this.calculateHandValue(hand) === 21;
  }
}