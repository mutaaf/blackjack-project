export type Suit = 'HEARTS' | 'DIAMONDS' | 'CLUBS' | 'SPADES';
export type Value = 'ACE' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | 'JACK' | 'QUEEN' | 'KING';

export interface Card {
  code: string;
  image: string;
  images: {
    svg: string;
    png: string;
  };
  value: Value;
  suit: Suit;
}

export interface Hand {
  cards: Card[];
  value: number;
}

export type GameStatus = 'playing' | 'playerWon' | 'houseWon' | 'tie';

export interface GameState {
  playerHand: Hand;
  houseHand: Hand;
  status: GameStatus;
  deckId: string | null;
}