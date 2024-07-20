import { GameEngine } from '../../src/utils/GameEngine';
import { Card } from '../../src/types';

describe('GameEngine', () => {
  let gameEngine: GameEngine;

  beforeEach(() => {
    gameEngine = new GameEngine();
  });

  describe('calculateHandValue', () => {
    it('correctly calculates hand value with number cards', () => {
      const hand: Card[] = [
        { value: '7', suit: 'HEARTS', code: '7H', image: '', images: {svg: '', png: '' }},
        { value: '9', suit: 'SPADES', code: '9S', image: '', images: {svg: '', png: '' }}
      ];
      expect(gameEngine.calculateHandValue(hand)).toBe(16);
    });

    it('correctly calculates hand value with face cards', () => {
      const hand: Card[] = [
        { value: 'KING', suit: 'HEARTS', code: 'KH', image: '' },
        { value: 'QUEEN', suit: 'SPADES', code: 'QS', image: '' },
      ];
      expect(gameEngine.calculateHandValue(hand)).toBe(20);
    });

    it('correctly calculates hand value with Ace as 11', () => {
      const hand: Card[] = [
        { value: 'ACE', suit: 'HEARTS', code: 'AH', image: '' },
        { value: '8', suit: 'SPADES', code: '8S', image: '' },
      ];
      expect(gameEngine.calculateHandValue(hand)).toBe(19);
    });

    it('correctly calculates hand value with Ace as 1', () => {
      const hand: Card[] = [
        { value: 'ACE', suit: 'HEARTS', code: 'AH', image: '' },
        { value: 'KING', suit: 'SPADES', code: 'KS', image: '' },
        { value: '5', suit: 'DIAMONDS', code: '5D', image: '' },
      ];
      expect(gameEngine.calculateHandValue(hand)).toBe(16);
    });
  });

  describe('determineGameStatus', () => {
    it('correctly determines player win', () => {
      expect(gameEngine.determineGameStatus(21, 20)).toBe('playerWon');
      expect(gameEngine.determineGameStatus(20, 19)).toBe('playerWon');
    });

    it('correctly determines house win', () => {
      expect(gameEngine.determineGameStatus(19, 20)).toBe('houseWon');
      expect(gameEngine.determineGameStatus(22, 20)).toBe('houseWon');
    });

    it('correctly determines tie', () => {
      expect(gameEngine.determineGameStatus(20, 20)).toBe('tie');
    });
  });

  describe('isBlackjack', () => {
    it('correctly identifies a blackjack', () => {
      const hand: Card[] = [
        { value: 'ACE', suit: 'HEARTS', code: 'AH', image: '' },
        { value: 'KING', suit: 'SPADES', code: 'KS', image: '' },
      ];
      expect(gameEngine.isBlackjack(hand)).toBe(true);
    });

    it('correctly identifies a non-blackjack', () => {
      const hand: Card[] = [
        { value: 'KING', suit: 'HEARTS', code: 'KH', image: '' },
        { value: 'QUEEN', suit: 'SPADES', code: 'QS', image: '' },
      ];
      expect(gameEngine.isBlackjack(hand)).toBe(false);
    });
  });
});