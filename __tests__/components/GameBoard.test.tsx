import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import GameBoard from '../../src/components/GameBoard';
import { GameState } from '../../src/types';

describe('GameBoard', () => {
  const mockGameState: GameState = {
    playerHand: { cards: [], value: 0 },
    houseHand: { cards: [], value: 0 },
    status: 'playing',
    deckId: 'test_deck_id',
  };

  const mockHandlers = {
    onHit: jest.fn(),
    onStand: jest.fn(),
    onNewGame: jest.fn(),
  };

  it('renders correctly', () => {
    const { getByText } = render(
      <GameBoard gameState={mockGameState} {...mockHandlers} />
    );
    expect(getByText(/Your Hand/)).toBeInTheDocument();
    expect(getByText(/House Hand/)).toBeInTheDocument();
    expect(getByText('Hit')).toBeInTheDocument();
    expect(getByText('Stand')).toBeInTheDocument();
  });

  it('calls onHit when Hit button is clicked', () => {
    const { getByText } = render(
      <GameBoard gameState={mockGameState} {...mockHandlers} />
    );

    fireEvent.click(getByText('Hit'));
    expect(mockHandlers.onHit).toHaveBeenCalled();
  });

  it('calls onStand when Stand button is clicked', () => {
    const { getByText } = render(
      <GameBoard gameState={mockGameState} {...mockHandlers} />
    );

    fireEvent.click(getByText('Stand'));
    expect(mockHandlers.onStand).toHaveBeenCalled();
  });

  it('disables action buttons when game is over', () => {
    const gameOverState = { ...mockGameState, status: 'playerWon' as const };
    const { getByText } = render(
      <GameBoard gameState={gameOverState} {...mockHandlers} />
    );

    expect(getByText('Hit')).toBeDisabled();
    expect(getByText('Stand')).toBeDisabled();
  });
});