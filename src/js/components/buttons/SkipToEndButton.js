import React, { useState } from 'react';

import Modal from '@johnshopkins/huddle-puzzle/modal';

import GetStartedButton from './GetStartedButton';
import PlayAgainButton from './PlayAgainButton';
import ResumeButton from './ResumeButton';
import Link from '../Link';

export default ({ puzzleData }) => {

  const [askUser, setAskUser] = useState(null);

  return (
    <>
      <Link
        classes={[]}
        text={'Skip to the end'}
        label={'Skip to end'}
        onClick={(e) => {
          e.preventDefault();
          setAskUser(true);
        }}
        url={puzzleData.message}
      />
      <Modal classes={['message']} open={askUser} onClose={() => setAskUser(false)}>
        <div className={'message'}>
          <p>Wait, are you sure you want to skip the puzzles?</p>
        </div>
        <div className={'modal-nav'}>
          <Link
            classes={[]}
            text={'Yes, take me to the message'}
            label={'Skip to end - confirmed skip'}
            url={puzzleData.message}
          />
          <GetStartedButton
            puzzleData={puzzleData}
            text={'No, I changed my mind - let\'s Huddle!'}
            label={'Skip to end - decided to play'}
          />
          <PlayAgainButton
            puzzleData={puzzleData}
            text={'No, I changed my mind - let\'s Huddle!'}
            label={'Skip to end - decided to play'} 
          />
          <ResumeButton
            puzzleData={puzzleData}
            text={'No, I changed my mind - let\'s continue!'}
            label={'Skip to end - decided to play'}
          />
        </div>
      </Modal>
    </>
  );
};
