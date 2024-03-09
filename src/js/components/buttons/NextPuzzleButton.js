import React from 'react';

import Link from '../Link';
import { hasFinishedPuzzle } from '../../helpers/persistance';

export default ({ puzzleData, track = true }) => {

  if (!hasFinishedPuzzle(puzzleData.puzzle.id)) {
    // user hasn't finished the puzzle yet
    return null;
  }

  const text = puzzleData.puzzle.id === puzzleData.puzzles.length ?
    'How did we do?' :
    'Next puzzle';

  const url = puzzleData.puzzle.id === puzzleData.puzzles.length ?
    puzzleData.message :
    puzzleData.puzzles[puzzleData.puzzle.id];

  return <Link
    classes={['next', 'button']}
    text={text}
    label={track ? text : null}
    url={url}
  />;

};
