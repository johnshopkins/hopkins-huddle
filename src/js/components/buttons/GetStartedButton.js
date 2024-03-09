import React from 'react';

import Link from '../Link';
import { getCurrentPuzzle } from '../../helpers/persistance';

export default ({ puzzleData, label, text }) => {

  if (getCurrentPuzzle() !== null) {
    // use has already started the game
    return null;
  }

  return <Link
    classes={['button']}
    text={text || 'Get started'}
    label={label || 'Start'}
    url={puzzleData.puzzles[0]}
  />;
  
};
