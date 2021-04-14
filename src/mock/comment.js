import { getRandomInt, getRandElemFromArray } from '../util.js';

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
const formatDateForComment = (date) => {
  const [month, day, year] = date.toLocaleDateString('en-US').split('/');
  const [hour, minute] = date.toLocaleTimeString('en-US').split(/:| /);

  return `${year}/${month}/${day} ${hour}:${minute}`;
};

// ---------------------------------------------------------
export const generateComment = () => {
  return {
    text: getRandElemFromArray(COMMENTS),
    emotion: getRandElemFromArray(EMOTIONS),
    author: getRandElemFromArray(AUTHORS),
    date: formatDateForComment(getRandDate()),
  };
};
