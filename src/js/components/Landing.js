import React from 'react';

import GetStartedButton from './buttons/GetStartedButton';
import PlayAgainButton from './buttons/PlayAgainButton';
import ResumeButton from './buttons/ResumeButton';
import ReviewButton from './buttons/ReviewButton';
import SkipToEndButton from './buttons/SkipToEndButton';
import StartOverButton from './buttons/StartOverButton';

import getPuzzleData from '../helpers/getPuzzleData';
import { seenLandingPage } from '../helpers/persistance';

const Landing = () => {

  seenLandingPage();

  const puzzleData = getPuzzleData();

  return (
    <div className={'navigation'}>
      <div className={'primary'}>
        <GetStartedButton puzzleData={puzzleData} />
        <ReviewButton puzzleData={puzzleData} />
        <PlayAgainButton puzzleData={puzzleData} />
        <ResumeButton puzzleData={puzzleData} />
      </div>
      
      <div className={'secondary'}>
        <StartOverButton puzzleData={puzzleData} />
        <SkipToEndButton puzzleData={puzzleData} />
      </div>
    </div>
  );
}

export default Landing;
