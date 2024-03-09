import React from 'react';

import Link from '../Link';
import {
  getCurrentPuzzle,
  hasFinishedGame,
} from '../../helpers/persistance';

export default ({ puzzleData, label, text }) => {

  const currentPuzzle = getCurrentPuzzle();

  if (!currentPuzzle || hasFinishedGame()) {
    // user hasn't started a puzzle OR they've finished the game
    return null;
  }

  return <Link
    classes={['button']}
    text={text || 'Resume'}
    label={label || 'Resume'}
    url={puzzleData.puzzles[currentPuzzle - 1]}
  />;
};
