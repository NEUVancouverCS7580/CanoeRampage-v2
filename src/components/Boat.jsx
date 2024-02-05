import React from 'react';
import PropTypes from 'prop-types';
import boatImage from '../assets/boat.png';

const Boat = ({ width, height, position }) => {
  return (
    <img
      src={boatImage}
      alt="Boat"
      style={{
        position: 'absolute',
        left: `${position}%`,
        bottom: '10%', // Adjust this percentage as needed
        width: `${width}px`,
        height: `${height}px`,
        transform: 'translateX(-50%)', // Center the boat horizontally
      }}
    />
  );
};

Boat.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  position: PropTypes.number.isRequired,
};

Boat.defaultProps = {
  width: 100,
  height: 50,
  position: 50,
};

export default Boat;
