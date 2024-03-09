import React from 'react';
import PropTypes from 'prop-types';

import Button from '../Button';
import { hasFinishedPuzzle } from '../../helpers/persistance';

const OpenMessageButton = ({ onClick, puzzleData }) => {

  if (!hasFinishedPuzzle(puzzleData.puzzle.id)) {
    // user hasn't finished the puzzle yet
    return null;
  }

  return <Button 
    classes={['message']} 
    onClick={onClick} 
    text={'See message again'}
    label={'Message'}
  />;
}

OpenMessageButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default OpenMessageButton;
