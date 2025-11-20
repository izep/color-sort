import React, { useState, useEffect } from 'react';
import { GameState } from '../types';
import { createInitialGame, canPour, pourColors, checkWin } from '../gameLogic';
import Tube from './Tube';
import './Game.css';

const Game: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>(createInitialGame(5));
  const [difficulty, setDifficulty] = useState(5);

  useEffect(() => {
    if (checkWin(gameState.tubes) && gameState.moves > 0) {
      setGameState(prev => ({ ...prev, isWon: true }));
    }
  }, [gameState.tubes, gameState.moves]);

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
          const { from, to } = pourColors(fromTube, toTube);
          const newTubes = [...gameState.tubes];
          newTubes[gameState.selectedTube] = from;
          newTubes[tubeId] = to;

          setGameState({
            tubes: newTubes,
            selectedTube: null,
            moves: gameState.moves + 1,
            isWon: false
          });
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
          🎉 You Won in {gameState.moves} moves!
        </div>
      )}

      <div className="tubes-container">
        {gameState.tubes.map(tube => (
          <Tube
            key={tube.id}
            tube={tube}
            isSelected={gameState.selectedTube === tube.id}
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
