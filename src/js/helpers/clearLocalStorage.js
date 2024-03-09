import {
  clear,
  saveCurrentPuzzle,
} from './persistance';

export default function () {
  clear();
  saveCurrentPuzzle(1);
  return true;
};
