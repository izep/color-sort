import { Tube, GameState } from './types';

export const COLORS = [
  '#FF0000', // Bright Red
  '#00FF00', // Bright Green
  '#0000FF', // Bright Blue
  '#FFFF00', // Bright Yellow
  '#FF00FF', // Magenta
  '#00FFFF', // Cyan
  '#FF6600', // Orange
  '#9900FF'  // Purple
];

export const createInitialGame = (difficulty: number = 4): GameState => {
  const numColors = difficulty;
  const tubeCapacity = 4;
  const colors = COLORS.slice(0, numColors);
  
  // Create array with 4 of each color
  const allColors: string[] = [];
  colors.forEach(color => {
    for (let i = 0; i < tubeCapacity; i++) {
      allColors.push(color);
    }
  });
  
  // Shuffle colors
  for (let i = allColors.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [allColors[i], allColors[j]] = [allColors[j], allColors[i]];
  }
  
  // Create tubes (filled tubes + 2 empty tubes)
  const tubes: Tube[] = [];
  for (let i = 0; i < numColors; i++) {
    tubes.push({
      id: i,
      colors: allColors.slice(i * tubeCapacity, (i + 1) * tubeCapacity),
      maxCapacity: tubeCapacity
    });
  }
  
  // Add empty tubes
  tubes.push({ id: numColors, colors: [], maxCapacity: tubeCapacity });
  tubes.push({ id: numColors + 1, colors: [], maxCapacity: tubeCapacity });
  
  return {
    tubes,
    selectedTube: null,
    moves: 0,
    isWon: false
  };
};

export const canPour = (fromTube: Tube, toTube: Tube): boolean => {
  if (fromTube.colors.length === 0) return false;
  if (toTube.colors.length >= toTube.maxCapacity) return false;
  if (toTube.colors.length === 0) return true;
  
  const topColorFrom = fromTube.colors[fromTube.colors.length - 1];
  const topColorTo = toTube.colors[toTube.colors.length - 1];
  
  return topColorFrom === topColorTo;
};

export const pourColors = (fromTube: Tube, toTube: Tube): { from: Tube; to: Tube } => {
  const newFromColors = [...fromTube.colors];
  const newToColors = [...toTube.colors];
  
  const topColor = newFromColors[newFromColors.length - 1];
  
  // Pour all consecutive colors of the same type
  while (
    newFromColors.length > 0 &&
    newFromColors[newFromColors.length - 1] === topColor &&
    newToColors.length < toTube.maxCapacity
  ) {
    const color = newFromColors.pop()!;
    newToColors.push(color);
  }
  
  return {
    from: { ...fromTube, colors: newFromColors },
    to: { ...toTube, colors: newToColors }
  };
};

export const checkWin = (tubes: Tube[]): boolean => {
  return tubes.every(tube => {
    if (tube.colors.length === 0) return true;
    if (tube.colors.length !== tube.maxCapacity) return false;
    return tube.colors.every(color => color === tube.colors[0]);
  });
};
