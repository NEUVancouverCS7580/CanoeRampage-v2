// River.js
import React from 'react';
import PropTypes from 'prop-types';
import backgroundImage from '../assets/river.jpg'; // Import the image here
import '../css/River.css';

const River = ({ height, backgroundImage: customBackgroundImage, children }) => {
  const riverStyle = {
    height: `${height}px`,
    backgroundImage: customBackgroundImage ? `url(${customBackgroundImage})` : `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
  };

  return (
    <div className="river-container" style={riverStyle}>
      <div className="river">{children}</div>
    </div>
  );
};

River.propTypes = {
  height: PropTypes.number.isRequired,
  backgroundImage: PropTypes.string, // You can provide a custom image path if needed
  children: PropTypes.node,
};

export default River;
