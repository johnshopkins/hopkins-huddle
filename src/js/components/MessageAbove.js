import React from 'react';

import ShareStatsButton from './buttons/ShareStatsButton'
import { hasFinishedGame } from '../helpers/persistance';
import getEmojiStats from '../helpers/getEmojiStats';

export default ({ puzzleData }) => {

  if (hasFinishedGame()) {
    const emojis = getEmojiStats(puzzleData.puzzles);
    return (
      <>
        <ShareStatsButton emojis={emojis} />
        <h1>You did it!</h1>
      </>
    )
  }

  return null;

};
