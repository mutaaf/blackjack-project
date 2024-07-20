import React from 'react';
import { render } from '@testing-library/react';
import Hand from '../../src/components/Hand';
import { Card, Hand as HandType } from '../../src/types';

// Mock the Card component
jest.mock('../../src/components/Card', () => {
  return function MockCard({ card }: { card: Card }) {
    return <div data-testid={`card-${card.code}`}>{card.value} of {card.suit}</div>;
  };
});

describe('Hand', () => {
  const mockHand: HandType = {
    cards: [
      { code: 'AH', value: 'ACE', suit: 'HEARTS', image: '', images: { svg: '', png: '' } },
      { code: 'KS', value: 'KING', suit: 'SPADES', image: '', images: { svg: '', png: '' } },
    ],
    value: 21,
  };

  it('renders the title and hand value', () => {
    const { getByText } = render(<Hand hand={mockHand} title="Player's Hand" />);
    expect(getByText("Player's Hand (Value: 21)")).toBeInTheDocument();
  });

  it('renders all cards in the hand', () => {
    const { getByTestId } = render(<Hand hand={mockHand} title="Player's Hand" />);
    expect(getByTestId('card-AH')).toBeInTheDocument();
    expect(getByTestId('card-KS')).toBeInTheDocument();
  });
});