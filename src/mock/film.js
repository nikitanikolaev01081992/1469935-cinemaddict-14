// prettier-ignore
import {
  getRandomInt,
  getRandomFloat,
  getRandElemFromArray,
  getRandArrayFromValues
} from '../utils/random.js';

import { GENRES } from '../constants.js';

import { generateComment } from './comment.js';

// ---------------------------------------------------------
// CONSTANTS/ENUMS
const FILM_NAMES = [
  'made for each other',
  'popeye meets sinbad',
  'sagebrush trail',
  'santa claus conquers the martians',
  'the dance of life',
  'the great flamarion',
  'the man with the golden arm',
];

// описания фильма
const DESCRIPTIONS = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget.',
  ' Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra.',
  'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.',
  ' Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.',
  ' Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.',
  ' Sed sed nisi sed augue convallis suscipit in sed felis.',
  ' Aliquam erat volutpat.',
  ' Nunc fermentum tortor ac porta dapibus.',
  ' In rutrum ac purus sit amet tempus.',
];

// возрастной рейтинг
const AGE_LIMITS = ['0+', '6+', '12+', '16+', '18+'];

// режиссёры
const DIRECTORS = ['David Lynch', 'Martin Scorsese', 'Joel and Ethan Coen', 'Steven Soderbergh', 'Terrence Malick', 'Quentin Tarantino'];

// сценаристы
const SCREENWRITES = ['Billy Wilder', 'Robert Towne', 'Quentin Tarantino', 'Francis Ford Coppola', 'William Goldman'];

// актёры
const ACTORS = [
  'Robert De Niro',
  'Jack Nicholson',
  'Marlon Brando',
  'Denzel Washington',
  'Katharine Hepburn',
  'Tom Hanks',
  'Elizabeth Taylor',
  'Leonardo DiCaprio',
  'Cate Blanchett',
  'Marilyn Monroe',
  'Halle Berry',
  'Julia Roberts',
];

const COUNTRIES = [
  'Afghanistan',
  'Australia',
  'Austria',
  'Brazil',
  'Canada',
  'China',
  'France',
  'Germany',
  'India',
  'Japan',
  'Netherlands',
  'Russia',
  'USA',
];

// дата резила фильма
const ReleaseDate = {
  MIN: 0,
  MAX: Date.now(),
};

// продолжтельность фильма в минутах
const Duration = {
  MIN: 60,
  MAX: 480,
};

// длина текста описания
const DescriptionNumber = {
  MIN: 1,
  MAX: 5,
};

// количество комментариев
const CommentNumber = {
  MIN: 0,
  MAX: 5,
};

// ---------------------------------------------------------
// мапа для перевода названия фильма в его постер
const filmToPosterMap = {
  'made for each other': 'made-for-each-other.png',
  'popeye meets sinbad': 'popeye-meets-sinbad.png',
  'sagebrush trail': 'sagebrush-trail.jpg',
  'santa claus conquers the martians': 'santa-claus-conquers-the-martians.jpg',
  'the dance of life': 'the-dance-of-life.jpg',
  'the great flamarion': 'the-great-flamarion.jpg',
  'the man with the golden arm': 'the-man-with-the-golden-arm.jpg',
};

// ---------------------------------------------------------
const getRandomDate = () => {
  return new Date(getRandomInt(ReleaseDate.MIN, ReleaseDate.MAX));
};

// ---------------------------------------------------------
// функция возвращает объект фильма
export const generateFilm = (filmId = 0) => {
  const name = getRandElemFromArray(FILM_NAMES);
  const date = getRandomDate();

  const description = getRandArrayFromValues(DESCRIPTIONS)
    .slice(DescriptionNumber.MIN - 1, DescriptionNumber.MAX)
    .join('');

  const commentNumber = getRandomInt(CommentNumber.MIN, CommentNumber.MAX);
  const comments = new Array(commentNumber).fill().map(generateComment);

  return {
    filmId,
    date,
    poster: `./images/posters/${filmToPosterMap[name]}`,
    name,
    rating: getRandomFloat(0, 10, 1),
    year: date.getFullYear(),
    duration: getRandomInt(Duration.MIN, Duration.MAX),
    genres: getRandArrayFromValues(GENRES),
    shortDescription: description,
    commentNumber,
    originalName: name,
    director: getRandElemFromArray(DIRECTORS),
    screenwriters: getRandArrayFromValues(SCREENWRITES),
    actors: getRandArrayFromValues(ACTORS),
    country: getRandElemFromArray(COUNTRIES),
    fullDescription: description,
    ageLimit: getRandElemFromArray(AGE_LIMITS),
    comments,
    isInWatchlist: Boolean(getRandomInt(0, 1)),
    isInHistory: Boolean(getRandomInt(0, 1)),
    isInFavourite: Boolean(getRandomInt(0, 1)),
  };
};
