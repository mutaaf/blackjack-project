import React from 'react';

interface ActionButtonsProps {
  onHit: () => void;
  onStand: () => void;
  disabled: boolean;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({ onHit, onStand, disabled }) => {
  return (
    <div className="flex justify-center mt-4">
      <button
        onClick={onHit}
        disabled={disabled}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2 disabled:opacity-50"
      >
        Hit
      </button>
      <button
        onClick={onStand}
        disabled={disabled}
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
      >
        Stand
      </button>
    </div>
  );
};

export default ActionButtons;