const store = {
  puzzleId: null,
};

const setPuzzleId = (id) => store.puzzleId = id;

export default () => ({
  baseUrl: 'https://thankyou.jhu.edu',
  baseUrlWithYear: 'https://thankyou.jhu.edu/2023',
  puzzles: [
    'game-1-url',
    'game-2-url',
    'game-3-url',
    'game-4-url',
  ],
  message: 'message-page-url',
  puzzle: {
    id: store.puzzleId,
    data: {
      answer: 'sushi',
      message: ['Puzzle message.'],
      answerDescription: 'The answer has 5 letters.',
      failMessage: 'We were looking for... {answer}.',
      successMessage: 'Nice!'
    }
  },
});

export {
  setPuzzleId
};
