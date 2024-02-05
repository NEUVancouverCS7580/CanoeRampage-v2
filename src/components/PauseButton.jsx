// PauseButton.js
import React from 'react';

const PauseButton = ({ onPause }) => {
  return <button className="pause-button" onClick={onPause}>Pause</button>;
};

export default PauseButton;