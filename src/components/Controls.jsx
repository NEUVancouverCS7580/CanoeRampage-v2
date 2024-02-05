// Controls.js
import React from 'react';

const Controls = ({ onMove, onPause, onResume, isPaused }) => {
  const CUSTOM_DISTANCE = 20; // Customize this value as needed

  return (
    <div className="controls">
      <button onClick={() => onMove('left', CUSTOM_DISTANCE)}>Left</button>
      {isPaused ? (
        <button onClick={onResume}>Resume</button>
      ) : (
        <button onClick={onPause}>Pause</button>
      )}
      <button onClick={() => onMove('right', CUSTOM_DISTANCE)}>Right</button>
    </div>
  );
};

export default Controls;
