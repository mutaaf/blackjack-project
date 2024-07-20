import React from 'react';
import { render } from '@testing-library/react';
import Card from '../../src/components/Card';
import { Card as CardType } from '../../src/types';

// Mock the next/image component
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    return <img {...props} />
  },
}));

describe('Card', () => {
  const mockCard: CardType = {
    code: 'AH',
    image: 'https://deckofcardsapi.com/static/img/AH.png',
    images: {
      svg: 'https://deckofcardsapi.com/static/img/AH.svg',
      png: 'https://deckofcardsapi.com/static/img/AH.png'
    },
    value: 'ACE',
    suit: 'HEARTS'
  };

  it('renders the card image', () => {
    const { getByAltText } = render(<Card card={mockCard} />);
    const cardImage = getByAltText('ACE of HEARTS');
    expect(cardImage).toBeInTheDocument();
    expect(cardImage).toHaveAttribute('src', mockCard.image);
  });

  it('applies correct CSS classes', () => {
    const { container } = render(<Card card={mockCard} />);
    expect(container.firstChild).toHaveClass('relative w-24 h-36 m-2');
  });
});