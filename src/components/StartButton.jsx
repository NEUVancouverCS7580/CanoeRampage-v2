// StartButton.js
import React from 'react';
import '../css/StartButton.css';  // Import the CSS file

const StartButton = ({ onClick }) => {
  const handleClick = (event) => {
    event.preventDefault();
    onClick();
  };

  return (
    <form onSubmit={handleClick}>
      <button className="start-button" type="submit">
        Start Game
      </button>
    </form>
  );
};

export default StartButton;