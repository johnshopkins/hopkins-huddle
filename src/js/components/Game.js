import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Events, Puzzle } from '@johnshopkins/huddle-puzzle';
import getPuzzleData from '../helpers/getPuzzleData';
import Error from './Error';
import MessageModal from './MessageModal';

import NextPuzzleButton from './buttons/NextPuzzleButton';
import HomepageButton from './buttons/HomepageButton';
import SkipToEndButton from './buttons/SkipToEndButton';
import OpenMessageButton from './buttons/OpenMessageButton';
import PreviousPuzzleButton from './buttons/PreviousPuzzleButton';

import {
  saveCurrentPuzzle,
  getCurrentPuzzle,
  hasSeenLandingPage,
  finishedGame,
  hasFinishedGame,
} from '../helpers/persistance';

class Game extends Component {

  constructor(props) {
    super(props);

    this.puzzleData = getPuzzleData();

    this.state = {

      // has the user finished the entire game (all puzzles)
      hasFinishedGame: hasFinishedGame(),

      // is a modal open?
      modalOpen: false,

      // data from server-side
      // baseUrl, baseUrlWithYear, puzzle (current puzzle data), puzzles (all puzzle urls
      ...this.puzzleData,
    };

    this.state.error = this.checkForError();

    this.onPuzzleComplete = this.onPuzzleComplete.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);

    this.onUserInitiatedInfoModal = this.onUserInitiatedInfoModal.bind(this);
    this.onUserGuess = this.onUserGuess.bind(this);
  }

  componentDidMount() {
    Events.subscribe('userInitiatedInfoModal', this.onUserInitiatedInfoModal);
    Events.subscribe('userGuess', this.onUserGuess, { once: true });
  }

  componentWillUnmount() {
    Events.unsubscribe('userInitiatedInfoModal', this.onUserInitiatedInfoModal);
    Events.unsubscribe('userGuess', this.onUserGuess);
  }

  onUserInitiatedInfoModal() {
    dataLayer.push({ event: 'tutorial_begin' });
  }

  onUserGuess(e) {
    dataLayer.push({
      event: 'level_start',
      level_name: this.state.puzzle.id,
    });
  }

  puzzleOrPuzzles(currentPuzzle) {

    if (currentPuzzle === null) {
      return this.state.puzzle.id === 2 ? 'puzzle' : 'puzzles';
    }

    return this.state.puzzle.id - currentPuzzle === 1 ? 'puzzle' : 'puzzles';
  }

  checkForError() {

    if (this.state.hasFinishedGame) {
      return false;
    }

    const currentPuzzle = getCurrentPuzzle();
    const errorMessage = `You need to complete the previous ${this.puzzleOrPuzzles(currentPuzzle)} before you can work on this one.`;

    if (currentPuzzle === null && hasSeenLandingPage() !== true) {
      // user hasn't started a puzzle or seen the homepage: send back to the homepage
      return {
        redirect: this.state.baseUrlWithYear,
        seconds: 0,
      };
    }

    if (currentPuzzle === null && this.state.puzzle.id > 1) {
      // user hasn't started a puzzle, but has seen the homepage: send to the first puzzle (only if they're not already on the first puzzle)
      return {
        message: errorMessage,
        redirect: this.state.puzzles[0],
      };
    }

    if (currentPuzzle === null) {
      // user hasn't started a puzzle yet and we're on the first puzzle; set initial puzzle ID
      saveCurrentPuzzle(this.state.puzzle.id);
    }

    if (currentPuzzle && currentPuzzle < this.state.puzzle.id) {
      // user has started a puzzle, but they are on a puzzle higher than their current puzzle: send to their current puzzle
      return {
        message: errorMessage,
        redirect: this.state.puzzles[currentPuzzle - 1],
      };
    }

    return false;
  }

  onPuzzleComplete(id, status, guesses) {

    dataLayer.push({
      event: 'level_end',
      level_name: this.state.puzzle.id,
      success: status === 'PASS',
      guesses: guesses,
    });

    // now that the puzzle has been completed
    // set the current puzzle as the next one
    if (this.state.puzzle.id === this.state.puzzles.length) {
      // game completed
      finishedGame();
      dataLayer.push({
        event: 'unlock_achievement',
        achievement_id: 'game_complete',
      });
    } else {
      // set current puzzle as the next puzzle
      saveCurrentPuzzle(this.state.puzzle.id + 1);
    }

    // allow time for the user to read the fail/success message
    setTimeout(() => {
      // open message modal
      this.setState({ modalOpen: 'message' });
    }, status === 'PASS' ? 1000 : 4000);
  }

  openModal() {
    this.setState({ modalOpen: 'message' });
  }

  closeModal() {
    this.setState({ modalOpen: null });
  }

  render() {

    if (this.state.error) {
      return (
        <Error testing={this.props.testing} {...this.state.error} />
      );
    }
    
    return (
      <>
        <MessageModal
          onClose={this.closeModal}
          message={this.state.puzzle.data.message}
          open={this.state.modalOpen === 'message'}
          testing={this.props.testing}
        >
          <NextPuzzleButton puzzleData={this.puzzleData} track={false} />
        </MessageModal>
        <Puzzle
          hidden={Boolean(this.state.modalOpen)}
          id={this.state.puzzle.id}
          puzzle={this.state.puzzle.data}
          debug={this.props.debug}
          onPuzzleComplete={this.onPuzzleComplete}
          // autoInfoModal={false}
          failMessage={this.state.puzzle.data.failMessage}
          successMessage={this.state.puzzle.data.successMessage}
          testing={this.props.testing}
          colors={{
            correct: 'blue',
            shuffle: 'gold',
          }}
        />

        <div className={'navigation'}>
          <div className={'primary'}>
            <PreviousPuzzleButton puzzleData={this.puzzleData} />
            <NextPuzzleButton puzzleData={this.puzzleData} />
          </div>
          <div className={'secondary'}>
            <OpenMessageButton
              puzzleData={this.puzzleData}
              onClick={this.openModal}
            />
            <HomepageButton puzzleData={this.puzzleData} />
            <SkipToEndButton puzzleData={this.puzzleData} />
          </div>
        </div>
      </>
    );
  }
}

Game.defaultProps = {
  debug: false,
  testing: false,
};

Game.propTypes = {
  debug: PropTypes.bool,
  testing: PropTypes.bool,
};

export default Game;
