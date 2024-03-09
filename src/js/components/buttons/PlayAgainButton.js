import React from 'react';

import Link from '../Link';
import { hasFinishedGame } from '../../helpers/persistance';
import clearLocalStorage from '../../helpers/clearLocalStorage';

export default ({ puzzleData, label, text }) => {

  if (!hasFinishedGame()) {
    // use hasn't finished the game yet
    return null;
  }

  return <Link
    classes={['button']}
    onClick={clearLocalStorage}
    text={text || 'Start over'}
    label={label || 'Play again'}
    url={puzzleData.puzzles[0]}
  />;

};
