import React, { useState, useEffect } from 'react';
import './css/App.css';
import River from './components/River';
import Boat from './components/Boat';
import Rocks from './components/Rocks';
import Controls from './components/Controls';
import StartButton from './components/StartButton';
import Scoreboard from './components/Scoreboard';
import PauseButton from './components/PauseButton';
import backgroundImage from './assets/river.jpg';

// Constants
const BUTTON_SPACING = 200;
const ROCK_SPEED = 500;

const App = () => {
  const [gameStarted, setGameStarted] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [score, setScore] = useState(0);
  const [boatPosition, setBoatPosition] = useState(50);

  const moveBoat = (direction, customDistance) => {
    if (!gameStarted || isPaused) {
      return;
    }

    const distance = customDistance || BUTTON_SPACING;
    setBoatPosition((prevPosition) => {
      const newPosition = direction === 'left' ? Math.max(5, prevPosition - distance) : Math.min(95, prevPosition + distance);
      return newPosition;
    });
  };

  const checkCollision = (rocks) => {
    for (const rock of rocks) {
      const { position, size } = rock;
      const boatLeft = boatPosition;
      const boatRight = boatPosition + BUTTON_SPACING;
      const rockLeft = position.x;
      const rockRight = position.x + size * 10;

      if (boatLeft < rockRight && boatRight > rockLeft && 90 < rockRight) {
        endGame();
        break;
      }
    }
  };

  const endGame = () => {
    setGameStarted(false);
    setIsPaused(false);
    alert(`Game Over! You collided with a rock. Your final score is ${score}`);
  };

  const togglePause = () => {
    setIsPaused((prevIsPaused) => !prevIsPaused);
  };

  useEffect(() => {
    const gameLogicInterval = setInterval(() => {
      if (gameStarted && !isPaused) {
        setScore((prevScore) => prevScore + 1);
        checkCollision([]);
      }
    }, ROCK_SPEED);

    return () => clearInterval(gameLogicInterval);
  }, [gameStarted, isPaused, score, boatPosition]);

  return (
    <div className="game-container">
      {gameStarted ? (
        <div>
          <Scoreboard score={score} />
          <River height={window.innerHeight} backgroundImage={backgroundImage}>
            <div className="controls-container">
              <Controls onMove={moveBoat} onPause={togglePause} onResume={togglePause} isPaused={isPaused} />
            </div>
            <Boat width={50} height={120} position={boatPosition} />
            {gameStarted && <Rocks rocks={[]} onCollision={endGame} boatPosition={boatPosition} />}
          </River>
          <PauseButton onPause={togglePause} isPaused={isPaused} />
        </div>
      ) : (
        <StartButton onClick={() => setGameStarted(true)} />
      )}
    </div>
  );
};

export default App;