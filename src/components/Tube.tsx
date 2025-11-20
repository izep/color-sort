import React from 'react';
import { Tube as TubeType } from '../types';
import { COLORS, COLOR_PATTERNS, COLOR_LABELS } from '../gameLogic';
import './Tube.css';

interface TubeProps {
  tube: TubeType;
  isSelected: boolean;
  onClick: () => void;
  isPouring?: boolean;
  isReceiving?: boolean;
  isComplete?: boolean;
  colorblindMode?: boolean;
}

const Tube: React.FC<TubeProps> = ({ tube, isSelected, onClick, isPouring, isReceiving, isComplete, colorblindMode }) => {
  const emptySlots = tube.maxCapacity - tube.colors.length;
  
  const getColorPattern = (color: string): string => {
    const index = COLORS.indexOf(color);
    return index >= 0 ? COLOR_PATTERNS[index] : 'solid';
  };

  const getColorLabel = (color: string): string => {
    const index = COLORS.indexOf(color);
    return index >= 0 ? COLOR_LABELS[index] : '';
  };
  
  return (
    <div 
      className={`tube ${isSelected ? 'selected' : ''} ${isPouring ? 'pouring' : ''} ${isReceiving ? 'receiving' : ''} ${isComplete ? 'complete' : ''}`}
      onClick={onClick}
    >
      <div className="tube-container">
        {Array.from({ length: emptySlots }).map((_, i) => (
          <div key={`empty-${i}`} className="color-slot empty" />
        ))}
        {[...tube.colors].reverse().map((color, i) => (
          <div 
            key={`color-${i}`} 
            className={`color-slot filled ${colorblindMode ? `pattern-${getColorPattern(color)}` : ''}`}
            style={{ backgroundColor: color }}
          >
            {colorblindMode && (
              <span className="color-label">{getColorLabel(color)}</span>
            )}
          </div>
        ))}
      </div>
      {isComplete && (
        <div className="completion-burst">
          <div className="sparkle"></div>
          <div className="sparkle"></div>
          <div className="sparkle"></div>
          <div className="sparkle"></div>
        </div>
      )}
    </div>
  );
};

export default Tube;
