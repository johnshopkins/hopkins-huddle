/**
 * @jest-environment jsdom
 */
import React from 'react';
import { render, screen, within } from '@testing-library/react';
import '@testing-library/jest-dom'

import Game from '../../src/js/components/Game';

import { setPuzzleId } from '../../src/js/helpers/getPuzzleData';
jest.mock('../../src/js/helpers/getPuzzleData');

import {
  getCurrentPuzzle,
  persistanceStore
} from '../../src/js/helpers/persistance';
jest.mock('../../src/js/helpers/persistance');

beforeEach(() => {
  setMocks({
    puzzleId: null,
    currentPuzzle: null,
    finishedPuzzle: false,
    seenLandingPage: null,
    finishedGame: null,
  });
});

const setMocks = (options = {}) => {
  if (typeof options.puzzleId !== 'undefined') {
    setPuzzleId(options.puzzleId);
  }

  if (typeof options.currentPuzzle !== 'undefined') {
    persistanceStore.currentPuzzle = options.currentPuzzle;
  }

  if (typeof options.finishedPuzzle !== 'undefined') {
    persistanceStore.finishedPuzzle = options.finishedPuzzle;
  }

  if (typeof options.seenLandingPage !== 'undefined') {
    persistanceStore.seenLandingPage = options.seenLandingPage;
  }

  if (typeof options.finishedGame !== 'undefined') {
    persistanceStore.finishedGame = options.finishedGame;
  }
}

describe('Game', () => {

  describe('Validate access to game', () => {

    describe('First visit (empty local storage)', () => {

      describe('On Puzzle #1 page', () => {

        test('Should redirect to homepage', () => {

          setMocks({
            puzzleId: 1
          });

          const { getByText } = render(<Game testing={true} />);
          expect(getByText('Redirect instantly to https://thankyou.jhu.edu/2023.')).toBeInTheDocument();

        });

      });

      describe('On Puzzle #3 page', () => {

        test('Should redirect to homepage', () => {

          setMocks({
            puzzleId: 3
          });

          const { getByText } = render(<Game testing={true} />);
          expect(getByText('Redirect instantly to https://thankyou.jhu.edu/2023.')).toBeInTheDocument();

          expect(getCurrentPuzzle()).toBeNull();

        });

      });

    });

    describe('User has seen the homepage', () => {

      describe('User has not initiated the game yet', () => {

        describe('On puzzle #1 page', () => {

          test('Let the player play the game', () => {

            setMocks({
              puzzleId: 1,
              seenLandingPage: true,
            });

            const { getByLabelText, queryByText } = render(<Game testing={true} />);
            expect(getByLabelText('Puzzle')).toBeInTheDocument();

            expect(queryByText('Previous puzzle')).not.toBeInTheDocument();
            expect(queryByText('Next puzzle')).not.toBeInTheDocument();

            expect(getCurrentPuzzle()).toEqual(1);

          });

        });

        describe('On puzzle #3 page', () => {

          test('Should redirect puzzle #1', () => {

            setMocks({
              puzzleId: 3,
              seenLandingPage: true,
            });

            const { getByRole } = render(<Game testing={true} />);
            expect(getByRole('link')).toHaveAttribute('href', 'game-1-url');

          });

        });

      });
      
      describe('Current puzzle is #1', () => {

        describe('On puzzle #1 page', () => {
          
          test('Should let the user play', () => {

            setMocks({
              currentPuzzle: 1,
              puzzleId: 1,
              seenLandingPage: true,
            });

            const { getByLabelText, queryByText } = render(<Game testing={true} />);
            expect(getByLabelText('Puzzle')).toBeInTheDocument();

            expect(queryByText('Previous puzzle')).not.toBeInTheDocument();
            expect(queryByText('Next puzzle')).not.toBeInTheDocument();

            expect(getCurrentPuzzle()).toEqual(1);

          });

        });

        describe('On puzzle #3 page', () => {
          
          test('Should redirect puzzle #1', () => {

            setMocks({
              currentPuzzle: 1,
              puzzleId: 3,
              seenLandingPage: true,
            });

            const { getByRole } = render(<Game testing={true} />);

            expect(getByRole('link')).toHaveAttribute('href', 'game-1-url')

          });

        });

      });

      describe('Current puzzle is #3', () => {

        describe('On puzzle #1 page', () => {
          
          test('User can view their completed puzzle', () => {

            setMocks({
              currentPuzzle: 3,
              puzzleId: 1,
              seenLandingPage: true,
              finishedPuzzle: true,
            });

            const { getByLabelText, getByText, queryByText } = render(<Game testing={true} />);

            expect(getByLabelText('Puzzle')).toBeInTheDocument();

            expect(queryByText('Previous puzzle')).not.toBeInTheDocument();
            expect(getByText('Next puzzle')).toBeInTheDocument();

            expect(getCurrentPuzzle()).toEqual(3);

          });

        });

        describe('On puzzle #2 page', () => {
          
          test('User can view their completed puzzle', () => {

            setMocks({
              currentPuzzle: 3,
              puzzleId: 2,
              seenLandingPage: true,
              finishedPuzzle: true,
            });

            const { getByLabelText, getByText } = render(<Game testing={true} />);

            expect(getByLabelText('Puzzle')).toBeInTheDocument();

            expect(getByText('Previous puzzle')).toBeInTheDocument();
            expect(getByText('Next puzzle')).toBeInTheDocument();

            expect(getCurrentPuzzle()).toEqual(3);

          });

        });

        describe('On puzzle #3 page', () => {
          
          test('Should redirect puzzle #2', () => {

            setMocks({
              currentPuzzle: 2,
              puzzleId: 3,
              seenLandingPage: true,
            });

            const { getByRole } = render(<Game testing={true} />);

            expect(getByRole('link')).toHaveAttribute('href', 'game-2-url');

          });

        });

        describe('On puzzle #4 page', () => {
          
          test('Should redirect puzzle #3', () => {

            setMocks({
              currentPuzzle: 3,
              puzzleId: 4,
              seenLandingPage: true,
            });

            const { getByRole } = render(<Game testing={true} />);

            expect(getByRole('link')).toHaveAttribute('href', 'game-3-url');

          });

        });

      });

    });

    describe('User completed the entire game', () => {

      describe('On puzzle #4 page', () => {

        test('User can view their completed puzzle', () => {

          setMocks({
            currentPuzzle: 6,
            puzzleId: 2,
            seenLandingPage: true,
            finishedPuzzle: true,
            finishedGame: true,
          });

          const { getByLabelText, getByText } = render(<Game testing={true} />);

          expect(getByLabelText('Puzzle')).toBeInTheDocument();

          expect(getByText('Previous puzzle')).toBeInTheDocument();
          expect(getByText('Next puzzle')).toBeInTheDocument();

          expect(getCurrentPuzzle()).toEqual(6);

        });

      });

    });

  });

});
