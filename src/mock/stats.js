import { getRandomInt, getRandElemFromArray, getRandomDuration } from '../utils/random.js';
import { GENRES } from '../constants.js';

// ---------------------------------------------------------
const Duration = {
  MIN: 0,
  MAX: Number.MAX_SAFE_INTEGER,
};

const Rank = {
  novice: {
    MIN: 1,
    MAX: 10,
  },
  fan: {
    MIN: 11,
    MAX: 20,
  },
  'movie buff': {
    MIN: 21,
    MAX: Number.MAX_SAFE_INTEGER,
  },
};

const WatchedNumber = {
  MIN: 0,
  MAX: 1000,
};

// ---------------------------------------------------------
const getRank = (watchedNumber) => {
  if (watchedNumber === 0) {
    return '';
  }

  for (const [rank, { MIN, MAX }] of Object.entries(Rank)) {
    if (watchedNumber >= MIN && watchedNumber <= MAX) {
      return rank;
    }
  }
};

// ---------------------------------------------------------
export const generateUserStats = () => {
  const watchedNumber = getRandomInt(WatchedNumber.MIN, WatchedNumber.MAX);

  return {
    rank: getRank(watchedNumber),
    watchedNumber,
    totalDuration: getRandomDuration(Duration.MIN, Duration.MAX),
    topGenre: getRandElemFromArray(GENRES),
  };
};
