import { getPuzzleStatsById } from './persistance';

export default function (puzzles, addBreakTag) {

  const blue = String.fromCodePoint(0x1F7E6);
  const gray = String.fromCodePoint(0x2B1C);

  return puzzles.map((puzzle, i) => {
    const data = getPuzzleStatsById(i + 1);
    return data.guesses.map((guess) => guess !== '' ? blue : gray).join('');
  }).join(addBreakTag ? "<br />" : "\n");
};
