import React from 'react';
import Card from './Card';
import { Hand as HandType } from '../types';

interface HandProps {
  hand: HandType;
  title: string;
}

const Hand: React.FC<HandProps> = ({ hand, title }) => {
  return (
    <div className="mb-4">
      <h2 className="text-xl font-bold mb-2">{title} (Value: {hand.value})</h2>
      <div className="flex flex-wrap">
        {hand.cards.map((card) => (
          <Card key={card.code} card={card} />
        ))}
      </div>
    </div>
  );
};

export default Hand;