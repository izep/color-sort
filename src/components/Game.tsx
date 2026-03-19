import React, { useState, useEffect, useRef, useCallback } from 'react';
import { GameState } from '../types';
import { createInitialGame, canPour, pourColors, checkWin, isTubeComplete } from '../gameLogic';
import Tube from './Tube';
import './Game.css';

interface BestScores {
  [difficulty: number]: { moves: number; time: number } | undefined;
}

const BEST_SCORES_KEY = 'colorSort_bestScores';

const loadBestScores = (): BestScores => {
  try {
    const raw = localStorage.getItem(BEST_SCORES_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
};

const saveBestScores = (scores: BestScores): void => {
  try {
    localStorage.setItem(BEST_SCORES_KEY, JSON.stringify(scores));
  } catch {
    // Ignore storage errors
  }
};

const formatTime = (seconds: number): string => {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, '0')}`;
};

const Game: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>(createInitialGame(5, false));
  const [difficulty, setDifficulty] = useState(5);
  const [pouringFrom, setPouringFrom] = useState<number | null>(null);
  const [pouringTo, setPouringTo] = useState<number | null>(null);
  const [completedTubes, setCompletedTubes] = useState<Set<number>>(new Set());
  const [gameHistory, setGameHistory] = useState<GameState[]>([]);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [bestScores, setBestScores] = useState<BestScores>(loadBestScores);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const elapsedTimeRef = useRef(0);
  const difficultyRef = useRef(difficulty);

  // Keep refs in sync with state
  useEffect(() => { elapsedTimeRef.current = elapsedTime; }, [elapsedTime]);
  useEffect(() => { difficultyRef.current = difficulty; }, [difficulty]);

  // Start/stop timer based on game state
  useEffect(() => {
    if (gameState.isWon || gameState.moves === 0) {
      if (timerRef.current !== null) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      return;
    }
    if (timerRef.current === null) {
      timerRef.current = setInterval(() => {
        setElapsedTime(prev => prev + 1);
      }, 1000);
    }
    return () => {
      if (timerRef.current !== null) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [gameState.isWon, gameState.moves]);

  useEffect(() => {
    if (checkWin(gameState.tubes) && gameState.moves > 0) {
      if (timerRef.current !== null) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      setGameState(prev => ({ ...prev, isWon: true }));
      playWinSound();

      // Update best scores using refs to read current difficulty and elapsedTime
      const currentDifficulty = difficultyRef.current;
      const currentTime = elapsedTimeRef.current;
      const currentMoves = gameState.moves;
      setBestScores(prev => {
        const existing = prev[currentDifficulty];
        const isBestMoves = !existing || currentMoves < existing.moves;
        const isBestTime = !existing || currentTime < existing.time;
        if (isBestMoves || isBestTime) {
          const updated: BestScores = {
            ...prev,
            [currentDifficulty]: {
              moves: isBestMoves ? currentMoves : existing!.moves,
              time: isBestTime ? currentTime : existing!.time
            }
          };
          saveBestScores(updated);
          return updated;
        }
        return prev;
      });
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
          // Save current state to history before the pour (keep last 20 moves)
          setGameHistory(prev => [...prev.slice(-19), { ...gameState, selectedTube: null }]);

          setPouringFrom(gameState.selectedTube);
          setPouringTo(tubeId);
          playPourSound();

          setTimeout(() => {
            const fromIndex = gameState.selectedTube!;
            const { from, to } = pourColors(fromTube, toTube);
            const newTubes = [...gameState.tubes];
            newTubes[fromIndex] = from;
            newTubes[tubeId] = to;

            setGameState(prev => ({
              ...prev,
              tubes: newTubes,
              selectedTube: null,
              moves: prev.moves + 1,
              isWon: false
            }));

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
    if (timerRef.current !== null) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    setDifficulty(diff);
    setGameState(createInitialGame(diff, gameState.colorblindMode));
    setCompletedTubes(new Set());
    setPouringFrom(null);
    setPouringTo(null);
    setGameHistory([]);
    setElapsedTime(0);
  };

  const handleUndo = useCallback(() => {
    if (gameHistory.length === 0) return;
    const previous = gameHistory[gameHistory.length - 1];
    setGameHistory(prev => prev.slice(0, -1));
    setGameState(previous);
    setPouringFrom(null);
    setPouringTo(null);
    // Rebuild completed tubes set from the restored state
    setCompletedTubes(() => {
      const completed = new Set<number>();
      previous.tubes.forEach(tube => {
        if (isTubeComplete(tube)) {
          completed.add(tube.id);
        }
      });
      return completed;
    });
  }, [gameHistory]);

  const toggleColorblindMode = () => {
    setGameState(prev => ({
      ...prev,
      colorblindMode: !prev.colorblindMode
    }));
  };

  const currentBest = bestScores[difficulty];

  return (
    <div className="game">
      <header className="game-header">
        <h1>🎨 Color Sort</h1>
        <div className="game-stats">
          <span>Moves: {gameState.moves}</span>
          <span className="stat-divider">|</span>
          <span>⏱ {formatTime(elapsedTime)}</span>
          {currentBest && (
            <>
              <span className="stat-divider">|</span>
              <span className="best-score">
                Best: {currentBest.moves} moves ({formatTime(currentBest.time)})
              </span>
            </>
          )}
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
            colorblindMode={gameState.colorblindMode}
            onClick={() => handleTubeClick(tube.id)}
          />
        ))}
      </div>

      <div className="controls">
        <div className="action-controls">
          <button onClick={() => handleNewGame()}>New Game</button>
          <button
            onClick={handleUndo}
            disabled={gameHistory.length === 0 || gameState.isWon}
            title="Undo last move"
          >
            ↩ Undo
          </button>
        </div>
        <button 
          onClick={toggleColorblindMode}
          className={gameState.colorblindMode ? 'active' : ''}
          title="Toggle colorblind accessibility mode"
        >
          {gameState.colorblindMode ? '👁️ Patterns ON' : '👁️ Patterns OFF'}
        </button>
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
