import Storage from '@johnshopkins/huddle-puzzle/storage';

const localKey = (key) => `hh.container.${key}`;

const saveValue = (key, value) => {
  try {
    return Storage.local.set(localKey(key), value);
  } catch (e) {
    logger.log('Unable to save data in local storage', {
      level: 'error',
      data: {
        key: key,
        value: value,
        error: e,
      }
    });
  }
};

const getValue = (key) => {
  return Storage.local.get(localKey(key));
};

const removeValue = (key) => {
  return Storage.local.remove(localKey(key));
};

const clear = () => {
  Storage.local.remove('hh.container.currentPuzzle');
  Storage.local.remove('hh.container.seenLandingPage');
  Storage.local.remove('hh.container.finishedGame');
  Storage.local.remove('hopkinshurdle.1');
  Storage.local.remove('hopkinshurdle.2');
  Storage.local.remove('hopkinshurdle.3');
  Storage.local.remove('hopkinshurdle.4');
  Storage.local.remove('hopkinshurdle.5');
  Storage.local.remove('hopkinshurdle.6');
}

const saveCurrentPuzzle = (id) => {
  return saveValue('currentPuzzle', id);
};

const getCurrentPuzzle = () => {
  return Storage.local.get(localKey('currentPuzzle'));
};

const seenLandingPage = () => {
  return saveValue('seenLandingPage', true);
};

const hasSeenLandingPage = () => {
  return Storage.local.get(localKey('seenLandingPage'));
};

const finishedGame = () => {
  return saveValue('finishedGame', true);
}

const hasFinishedGame = () => {
  return Storage.local.get(localKey('finishedGame'));
}

const hasFinishedPuzzle = (id) => {
  const data = Storage.local.get(`hopkinshurdle.${id}`);
  return data !== null && data.status !== 'IN_PROGRESS';
}

const getPuzzleStatsById = (id) => {
  return Storage.local.get(`hopkinshurdle.${id}`);
}

export {
  clear,
  saveCurrentPuzzle,
  getCurrentPuzzle,
  seenLandingPage,
  hasFinishedPuzzle,
  hasSeenLandingPage,
  finishedGame,
  hasFinishedGame,
  getPuzzleStatsById,
  saveValue,
  getValue,
  removeValue,
};
