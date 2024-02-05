// EndButton.js
import React from 'react';
import '../css/EndButton.css'; // Import the CSS file

const EndButton = ({ onEnd }) => {
  const handleClick = (event) => {
    event.preventDefault();
    onEnd();
  };

  return (
    <form onSubmit={handleClick}>
      <button className="end-button" type="submit">
        End Game
      </button>
    </form>
  );
};

export default EndButton;
