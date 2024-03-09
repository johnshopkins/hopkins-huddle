import React from 'react';

import Link from '../Link';

export default ({ puzzleData }) => {
  if (puzzleData.puzzle.id === 1) {
    return null;
  }

  return <Link 
    classes={['prev', 'button']} 
    text={'Previous puzzle'} 
    label={'Previous puzzle'}
    url={puzzleData.puzzles[puzzleData.puzzle.id - 2]} 
  />;
};
