const store = {
  currentPuzzle: null,
  seenLandingPage: null,
  finishedGame: null,
  finishedPuzzle: null,
};

const clear = () => {
  store.currentPuzzle = null;
  store.seenLandingPage = null;
  store.finishedGame = null;
}

const saveCurrentPuzzle = (id) => {
  store.currentPuzzle = id;
};

const getCurrentPuzzle = () => {
  return store.currentPuzzle;
};

const seenLandingPage = () => {
  store.seenLandingPage = true;
};

const hasSeenLandingPage = () => {
  return store.seenLandingPage;
};

const finishedGame = () => {
  store.finishedGame = true;
}

const hasFinishedGame = () => {
  return store.finishedGame;
}

const hasFinishedPuzzle = (id) => {
  return store.finishedPuzzle;
}

const saveValue = (key, value) => {
  return store[key] = value;
}

const getValue = (key) => {
  return store[key] || null;
}

const removeValue = (key) => {
  delete store[key];
}

// const getPuzzleStatsById = (id) => {
//   return localStorage.get(`hopkinshurdle.${id}`);
// }

export {
  store as persistanceStore,
  clear,
  saveCurrentPuzzle,
  getCurrentPuzzle,
  seenLandingPage,
  hasFinishedPuzzle,
  hasSeenLandingPage,
  finishedGame,
  hasFinishedGame,
  saveValue,
  getValue,
  removeValue
  // getPuzzleStatsById,
};
