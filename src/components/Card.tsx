import React from 'react';
import Image from 'next/image';
import { Card as CardType } from '../types';

interface CardProps {
  card: CardType;
}

const Card: React.FC<CardProps> = ({ card }) => {
  return (
    <div className="relative w-24 h-36 m-2">
      {card.image ? (
        <Image
          src={card.image}
          alt={`${card.value} of ${card.suit}`}
          width={96}
          height={144}
          layout="responsive"
          className="rounded-lg shadow-md"
        />
      ) : (
        <div className="w-full h-full bg-gray-200 rounded-lg shadow-md flex items-center justify-center">
          <span className="text-lg font-bold">{card.value} {card.suit}</span>
        </div>
      )}
    </div>
  );
};

export default Card;