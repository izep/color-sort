import React from 'react';
import { Tube as TubeType } from '../types';
import './Tube.css';

interface TubeProps {
  tube: TubeType;
  isSelected: boolean;
  onClick: () => void;
}

const Tube: React.FC<TubeProps> = ({ tube, isSelected, onClick }) => {
  const emptySlots = tube.maxCapacity - tube.colors.length;
  
  return (
    <div 
      className={`tube ${isSelected ? 'selected' : ''}`}
      onClick={onClick}
    >
      <div className="tube-container">
        {Array.from({ length: emptySlots }).map((_, i) => (
          <div key={`empty-${i}`} className="color-slot empty" />
        ))}
        {[...tube.colors].reverse().map((color, i) => (
          <div 
            key={`color-${i}`} 
            className="color-slot filled"
            style={{ backgroundColor: color }}
          />
        ))}
      </div>
    </div>
  );
};

export default Tube;
