import React from 'react';

import Link from '../Link';
import {
  getCurrentPuzzle,
  hasFinishedGame,
} from '../../helpers/persistance';
import clearLocalStorage from '../../helpers/clearLocalStorage';

export default ({ puzzleData }) => {

  if (!getCurrentPuzzle() || hasFinishedGame()) {
    // user hasn't started a puzzle OR they've finished the game
    return null;
  }

  return <Link
    classes={[]}
    onClick={clearLocalStorage}
    text={'Start over'}
    label={'Restart'}
    url={puzzleData.puzzles[0]}
  />;

};
