import React from 'react';

import HomepageButton from './buttons/HomepageButton';
import PlayAgainButton from './buttons/PlayAgainButton';
import ReviewButton from './buttons/ReviewButton';
import StartOverButton from './buttons/StartOverButton';

import ShareStatsButton from './buttons/ShareStatsButton'
import { hasFinishedGame } from '../helpers/persistance';
import getEmojiStats from '../helpers/getEmojiStats';

export default ({ puzzleData }) => {


  if (hasFinishedGame()) {
    return (
      <>
        <div className={'stats'}>
          <p>Here's how you did:</p>
          <div className={'stats'} dangerouslySetInnerHTML={{__html: getEmojiStats(puzzleData.puzzles, true)}} />
          <div className={'text'}>
            <ShareStatsButton emojis={getEmojiStats(puzzleData.puzzles)} />
            <div className={'text'}>
              <p>The rows pictured correspond to the six word puzzles that make up Hopkins Huddle. In each row, the number of blue boxes shows how many guesses you needed to correctly solve the puzzle.</p>
              <p>See how you did, and share your results with other Huddle puzzlers.</p>
            </div>
          </div>
        </div>
        <div className={'navigation'}>
          <div className={'primary'}>
            <ReviewButton puzzleData={puzzleData} />
            <PlayAgainButton puzzleData={puzzleData} />
          </div>
          
          <div className={'secondary'}>
            <StartOverButton puzzleData={puzzleData} />
            <HomepageButton puzzleData={puzzleData} />
          </div>
        </div>
      </>
    )
  }

  return null;

};
