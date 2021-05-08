import { getRandomInt, getRandElemFromArray } from '../utils/random.js';

// ---------------------------------------------------------
// CONSTANTS/ENUMS
const EMOTIONS = ['smile', 'sleeping', 'puke', 'angry'];

const COMMENTS = [
  'Interesting setting and a good cast',
  'Booooooooooring',
  'Very very old. Meh',
  'Almost two hours? Seriously?',
  'Nice!!!',
];

const AUTHORS = ['Tim Macoveev', 'Ivan Ivanov', 'John Doe', 'Johny Dony', 'Samurai Jack', 'Jonhathan Donatan'];

// min and max date in milliseconds
const DATE = {
  MIN: 0,
  MAX: Date.now(),
};

// ---------------------------------------------------------
const getRandDate = () => new Date(getRandomInt(DATE.MIN, DATE.MAX));

// ---------------------------------------------------------
export const generateComment = () => {
  return {
    text: getRandElemFromArray(COMMENTS),
    emotion: getRandElemFromArray(EMOTIONS),
    author: getRandElemFromArray(AUTHORS),
    date: getRandDate(),
  };
};
