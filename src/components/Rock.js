// Rock.js
import React from 'react';
import PropTypes from 'prop-types';
import RockImage from '../assets/rock.png';
import styles from '../css/Rocks.modules.css';

const Rock = ({ size, position }) => {
  const rockContainerStyle = {
    position: 'absolute',
    left: `${position.x}%`,
    top: `${position.y}%`,
    width: `${size * 50}px`, // Adjusted the scaling factor
    height: `${size * 100}px`, // Adjusted the scaling factor
    backgroundColor: 'transparent',
  };

  return (
    <div className={styles.rockContainer} style={rockContainerStyle}>
      <img src={RockImage} alt="Rock" className={styles.rockImage} />
    </div>
  );
};

Rock.propTypes = {
  size: PropTypes.number.isRequired,
  position: PropTypes.shape({
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
  }).isRequired,
};

export default Rock;
