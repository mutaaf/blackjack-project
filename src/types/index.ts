// Card related types
export type Suit = 'HEARTS' | 'DIAMONDS' | 'CLUBS' | 'SPADES';
export type Value = 'ACE' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | 'JACK' | 'QUEEN' | 'KING';

export interface Card {
  code: string;
  image?: string;
  images?: {
    svg: string;
    png: string;
  };
  value: Value;
  suit: Suit;
}

// Hand related types
export interface Hand {
  cards: Card[];
  value: number;
}

// Game status
export type GameStatus = 'playing' | 'playerWon' | 'houseWon' | 'tie';

// Game state
export interface GameState {
  playerHand: Hand;
  houseHand: Hand;
  status: GameStatus;
  deckId: string | null;
}

// Action types for reducer
export type Action =
  | { type: 'INITIALIZE_GAME'; payload: { playerCards: Card[]; houseCards: Card[]; deckId: string } }
  | { type: 'HIT'; payload: { card: Card } }
  | { type: 'STAND' }
  | { type: 'NEW_GAME' };

// Props for components
export interface HandProps {
  hand: Hand;
  title: string;
}

export interface ActionButtonsProps {
  onHit: () => void;
  onStand: () => void;
  disabled: boolean;
}

export interface GameStatusProps {
  status: GameStatus;
  onNewGame: () => void;
}

export interface GameBoardProps {
  gameState: GameState;
  onHit: () => void;
  onStand: () => void;
  onNewGame: () => void;
}

// Service related types
export interface DeckService {
  newDeck: () => Promise<string>;
  drawCards: (deckId: string, count: number) => Promise<Card[]>;
  shuffleDeck: (deckId: string) => Promise<void>;
}

// Hook return types
export interface UseBlackjackReturn {
  gameState: GameState;
  hit: () => void;
  stand: () => void;
  initializeGame: () => void;
}

export interface UseDeckReturn {
  deckId: string | null;
  initializeDeck: () => Promise<string>;
  drawCards: (deckId: string, count: number) => Promise<Card[]>;
  shuffleDeck: () => Promise<void>;
}