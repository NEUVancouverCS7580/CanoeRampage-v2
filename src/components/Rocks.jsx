import React, { useState, useEffect } from 'react';
import Rock from './Rock';

const ROCK_SCROLL_INTERVAL = 0.5;
const NUM_INITIAL_ROCKS = 2;
const ROCK_GENERATION_INTERVAL = 5000;
const MIN_ROCK_SIZE = 0.01;
const MAX_ROCK_SIZE = 0.2;
const BOAT_WIDTH = 60;
const BOAT_HEIGHT = 80;

const Rocks = ({ onCollision, boatPosition }) => {
  const [rocks, setRocks] = useState([]);

  const generateRandomRock = () => ({
    id: Math.random().toString(36).substr(2, 9),
    position: { x: Math.random() * 40 + 5, y: -10 },
    size: Math.max(MIN_ROCK_SIZE, Math.min(MAX_ROCK_SIZE, Math.random() * (MAX_ROCK_SIZE - MIN_ROCK_SIZE) + MIN_ROCK_SIZE)),
  });

  const generateRandomRocks = () => {
    setRocks((prevRocks) => [...prevRocks, generateRandomRock()]);
  };

  const moveRocks = () => {
    setRocks((prevRocks) =>
      prevRocks.map((rock) => ({
        ...rock,
        position: { ...rock.position, y: rock.position.y + ROCK_SCROLL_INTERVAL },
      }))
    );
  };

  const cleanupRocks = () => {
    setRocks((prevRocks) => prevRocks.filter((rock) => rock.position.y <= window.innerHeight));
  };

  useEffect(() => {
    const initialRocks = Array.from({ length: NUM_INITIAL_ROCKS }, generateRandomRock);
    setRocks(initialRocks);
  }, [NUM_INITIAL_ROCKS]);

  useEffect(() => {
    const gameInterval = setInterval(() => {
      moveRocks();
      cleanupRocks();
    }, 16);

    const rocksGenerationInterval = setInterval(generateRandomRocks, ROCK_GENERATION_INTERVAL);

    // Clear intervals on component unmount
    return () => {
      clearInterval(gameInterval);
      clearInterval(rocksGenerationInterval);
    };
  }, []);

  useEffect(() => {
    for (const rock of rocks) {
      const { position, size } = rock;
      const collisionBoundary = {
        x1: position.x,
        x2: position.x + size * 2,
        y1: position.y,
        y2: position.y + size * 6,
      };

      const horizontalOverlap = boatPosition < collisionBoundary.x2 && boatPosition + BOAT_WIDTH > collisionBoundary.x1;
      const verticalOverlap = BOAT_HEIGHT < collisionBoundary.y2;

      if (horizontalOverlap && verticalOverlap) {
        onCollision();
        break;
      }
    }
  }, [rocks, onCollision, boatPosition]);

  return (
    <div>
      {rocks.map((rock) => (
        <Rock key={rock.id} size={rock.size} position={rock.position} />
      ))}
    </div>
  );
};

export default Rocks;
