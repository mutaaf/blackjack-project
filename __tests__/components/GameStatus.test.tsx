import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import GameStatus from '../../src/components/GameStatus';

describe('GameStatus', () => {
  const mockOnNewGame = jest.fn();

  it('renders "You won!" when status is playerWon', () => {
    const { getByText } = render(<GameStatus status="playerWon" onNewGame={mockOnNewGame} />);
    expect(getByText('You won!')).toBeInTheDocument();
  });

  it('renders "House won!" when status is houseWon', () => {
    const { getByText } = render(<GameStatus status="houseWon" onNewGame={mockOnNewGame} />);
    expect(getByText('House won!')).toBeInTheDocument();
  });

  it('renders "It\'s a tie!" when status is tie', () => {
    const { getByText } = render(<GameStatus status="tie" onNewGame={mockOnNewGame} />);
    expect(getByText("It's a tie!")).toBeInTheDocument();
  });

  it('does not render anything when status is playing', () => {
    const { container } = render(<GameStatus status="playing" onNewGame={mockOnNewGame} />);
    expect(container.firstChild).toBeNull();
  });

  it('calls onNewGame when New Game button is clicked', () => {
    const { getByText } = render(<GameStatus status="playerWon" onNewGame={mockOnNewGame} />);
    fireEvent.click(getByText('New Game'));
    expect(mockOnNewGame).toHaveBeenCalled();
  });
});