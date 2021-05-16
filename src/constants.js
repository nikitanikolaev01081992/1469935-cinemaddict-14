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

// ---------------------------------------------------------
const SortType = {
  DEFAULT: 'default',
  DATE_DOWN: 'dateDown',
  RATING_DOWN: 'ratingDown',
};

// ---------------------------------------------------------
const FilterType = {
  ALL: 'all movies',
  WATCHLIST: 'Watchlist',
  HISTORY: 'History',
  FAVOURITES: 'Favorites',
};

// ---------------------------------------------------------
const ActionType = {
  UPDATE_FILM: 'UPDATE_FILM',
  ADD_COMMENT: 'ADD_COMMENT',
  DELETE_COMMENT: 'DELETE_COMMENT',
};

// ---------------------------------------------------------
const UpdateType = {
  PATCH: 'patch',
  MINOR: 'minor',
  MAJOR: 'major',
};

// ---------------------------------------------------------
// EXPORTS
// prettier-ignore
export {
  CSS_HIDDEN_CLASS,
  CSS_HIDE_OVERFLOW_CLASS,
  CSS_FILMS_CONTAINER_CLASS,
  FilmListTitle,
  MINUTES_IN_HOUR,
  GENRES,
  SortType,
  FilterType,
  ActionType,
  UpdateType
};
