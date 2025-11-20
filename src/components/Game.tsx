import React, { useState, useEffect } from 'react';
import { GameState } from '../types';
import { createInitialGame, canPour, pourColors, checkWin, isTubeComplete } from '../gameLogic';
import Tube from './Tube';
import './Game.css';

const Game: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>(createInitialGame(5));
  const [difficulty, setDifficulty] = useState(5);
  const [pouringFrom, setPouringFrom] = useState<number | null>(null);
  const [pouringTo, setPouringTo] = useState<number | null>(null);
  const [completedTubes, setCompletedTubes] = useState<Set<number>>(new Set());

  useEffect(() => {
    if (checkWin(gameState.tubes) && gameState.moves > 0) {
      setGameState(prev => ({ ...prev, isWon: true }));
      playWinSound();
    }
  }, [gameState.tubes, gameState.moves]);

  const playPourSound = () => {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.setValueAtTime(400, audioContext.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(200, audioContext.currentTime + 0.3);
    
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.3);
  };

  const playCompleteSound = () => {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const notes = [523.25, 659.25, 783.99]; // C, E, G chord
    
    notes.forEach((freq, index) => {
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.setValueAtTime(freq, audioContext.currentTime);
      gainNode.gain.setValueAtTime(0.2, audioContext.currentTime + index * 0.05);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
      
      oscillator.start(audioContext.currentTime + index * 0.05);
      oscillator.stop(audioContext.currentTime + 0.5);
    });
  };

  const playWinSound = () => {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const melody = [
      { freq: 523.25, time: 0 },    // C
      { freq: 659.25, time: 0.15 },  // E
      { freq: 783.99, time: 0.3 },   // G
      { freq: 1046.5, time: 0.45 },  // C high
    ];
    
    melody.forEach(note => {
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.setValueAtTime(note.freq, audioContext.currentTime + note.time);
      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime + note.time);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + note.time + 0.3);
      
      oscillator.start(audioContext.currentTime + note.time);
      oscillator.stop(audioContext.currentTime + note.time + 0.3);
    });
  };

  const handleTubeClick = (tubeId: number) => {
    if (gameState.isWon) return;

    if (gameState.selectedTube === null) {
      if (gameState.tubes[tubeId].colors.length > 0) {
        setGameState(prev => ({ ...prev, selectedTube: tubeId }));
      }
    } else {
      if (gameState.selectedTube === tubeId) {
        setGameState(prev => ({ ...prev, selectedTube: null }));
      } else {
        const fromTube = gameState.tubes[gameState.selectedTube];
        const toTube = gameState.tubes[tubeId];

        if (canPour(fromTube, toTube)) {
          setPouringFrom(gameState.selectedTube);
          setPouringTo(tubeId);
          playPourSound();

          setTimeout(() => {
            const fromIndex = gameState.selectedTube!;
            const { from, to } = pourColors(fromTube, toTube);
            const newTubes = [...gameState.tubes];
            newTubes[fromIndex] = from;
            newTubes[tubeId] = to;

            setGameState({
              tubes: newTubes,
              selectedTube: null,
              moves: gameState.moves + 1,
              isWon: false
            });

            setPouringFrom(null);
            setPouringTo(null);

            // Check if destination tube is now complete
            if (isTubeComplete(to) && !completedTubes.has(tubeId)) {
              setCompletedTubes(prev => {
                const newSet = new Set(prev);
                newSet.add(tubeId);
                return newSet;
              });
              setTimeout(() => playCompleteSound(), 300);
            }
          }, 600);
        } else {
          setGameState(prev => ({ ...prev, selectedTube: null }));
        }
      }
    }
  };

  const handleNewGame = (newDifficulty?: number) => {
    const diff = newDifficulty ?? difficulty;
    setDifficulty(diff);
    setGameState(createInitialGame(diff));
    setCompletedTubes(new Set());
    setPouringFrom(null);
    setPouringTo(null);
  };

  return (
    <div className="game">
      <header className="game-header">
        <h1>🎨 Color Sort</h1>
        <div className="game-stats">
          <span>Moves: {gameState.moves}</span>
        </div>
      </header>

      {gameState.isWon && (
        <div className="win-message">
          🎉 You Won in {gameState.moves} moves! 🎉
        </div>
      )}

      <div className="tubes-container">
        {gameState.tubes.map(tube => (
          <Tube
            key={tube.id}
            tube={tube}
            isSelected={gameState.selectedTube === tube.id}
            isPouring={pouringFrom === tube.id}
            isReceiving={pouringTo === tube.id}
            isComplete={completedTubes.has(tube.id)}
            onClick={() => handleTubeClick(tube.id)}
          />
        ))}
      </div>

      <div className="controls">
        <button onClick={() => handleNewGame()}>New Game</button>
        <div className="difficulty-controls">
          <label>Difficulty:</label>
          <button 
            onClick={() => handleNewGame(4)}
            className={difficulty === 4 ? 'active' : ''}
          >
            Easy
          </button>
          <button 
            onClick={() => handleNewGame(5)}
            className={difficulty === 5 ? 'active' : ''}
          >
            Medium
          </button>
          <button 
            onClick={() => handleNewGame(6)}
            className={difficulty === 6 ? 'active' : ''}
          >
            Hard
          </button>
          <button 
            onClick={() => handleNewGame(7)}
            className={difficulty === 7 ? 'active' : ''}
          >
            Expert
          </button>
        </div>
      </div>
    </div>
  );
};

export default Game;
