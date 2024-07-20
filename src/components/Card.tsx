import React from 'react';
import Image from 'next/image';
import { Card as CardType } from '../types';

interface CardProps {
  card: CardType;
}

const Card: React.FC<CardProps> = ({ card }) => {
  return (
    <div className="relative w-24 h-36 m-2">
      <Image
        src={card.image ? card.image : ''}
        alt={`${card.value} of ${card.suit}`}
        layout="fill"
        style={{ objectFit: 'contain' }}
        className="rounded-lg shadow-md"
      />
    </div>
  );
};

export default Card;