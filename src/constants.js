// COMMON CONSTANTS/ENUMS
const CSS_HIDDEN_CLASS = 'visually-hidden';

const CSS_HIDE_OVERFLOW_CLASS = 'hide-overflow';

const CSS_FILMS_CONTAINER_CLASS = 'films-list__container';

// минуты в часе
const MINUTES_IN_HOUR = 60;

// жанры фильма
const GENRES = ['Action and adventure', 'Animation', 'Comedy', 'Drama', 'Historical', 'Horror', 'Science fiction'];

const FilmListTitle = {
  DEFAULT: 'All movies. Upcoming',
  TOP_RATED: 'Top rated',
  MOST_COMMENTED: 'Most commented',
};

const SortType = {
  DEFAULT: 'default',
  DATE_DOWN: 'dateDown',
  RATING_DOWN: 'ratingDown',
};

// ---------------------------------------------------------
// EXPORTS
export { CSS_HIDDEN_CLASS, CSS_HIDE_OVERFLOW_CLASS, CSS_FILMS_CONTAINER_CLASS, FilmListTitle, MINUTES_IN_HOUR, GENRES, SortType };
