import React from 'react';

import Link from '../Link';
import { hasFinishedGame } from '../../helpers/persistance';

export default ({ puzzleData }) => {

  if (!hasFinishedGame()) {
    // user hasn't finished the game yet
    return null;
  }

  return <Link
    classes={['button']}
    text={'Review my progress'}
    label={'Review'}
    url={puzzleData.puzzles[0]}
  />;
  
};
