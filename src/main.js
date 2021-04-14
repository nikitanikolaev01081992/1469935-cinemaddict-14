import { getNode, getNodes, render, sortArrayOfObjects } from './util.js';
import { getRatingComponent } from './view/rating.js';
import { getMenuComponent } from './view/menu.js';
// import { getStatsComponent } from './view/stats.js';
import { getSortComponent } from './view/sort.js';
import { getFilmsListComponent } from './view/filmsList.js';
import { getFilmCardComponent } from './view/filmCard.js';
import { getShowMoreComponent } from './view/showMoreButton';
import { getFilmDetailsComponent } from './view/filmDetails.js';
import { getTotalFilmsNumComponent } from './view/totalFilmsNum.js';

import { generateFilm } from './mock/film.js';
import { generateFilters } from './mock/filters.js';
import { generateUserStats } from './mock/stats.js';

// ---------------------------------------------------------
// CONSTANTS
const FILM_COUNT = 20;
const FILM_COUNT_PER_STEP = 5;

const TOP_RATED_MAX = 2;
const MOST_COMMENTED_MAX = 2;

// ---------------------------------------------------------

// Data
const filmsData = new Array(FILM_COUNT).fill().map((_, index) => generateFilm(index + 1));

// Filters in menu
const filters = generateFilters(filmsData);

// UserStatistic
const userStats = generateUserStats();

// ---------------------------------------------------------
// initial DOM elements
const headerNode = getNode('.header');
const mainNode = getNode('.main');
const filmsNode = getNode('.films');
const footerNode = getNode('.footer');
const footerStatsNode = getNode('.footer__statistics');

// ---------------------------------------------------------

// рейтинг пользователя
render(headerNode, getRatingComponent(userStats.rank));

// сортировка
render(mainNode, getSortComponent(), 'afterbegin');

// меню с фильтрами
render(mainNode, getMenuComponent(filters), 'afterbegin');

// общее количество фильмов
render(footerStatsNode, getTotalFilmsNumComponent());

// статистика пользователя
// render(mainNode, getStatsComponent(userStats), 'afterbegin');

// ---------------------------------------------------------
// список фильмов
render(filmsNode, getFilmsListComponent(filmsData.slice(0, FILM_COUNT_PER_STEP)));

// список фильмов top rated
if (filmsData.length > 0) {
  const topRatedFilms = sortArrayOfObjects(filmsData, 'rating').slice(0, TOP_RATED_MAX);
  render(filmsNode, getFilmsListComponent(topRatedFilms, true, 'TOP_RATED'));
}

// список фильмов most commented
if (filmsData.length > 0) {
  const mostCommentedFilms = sortArrayOfObjects(filmsData, 'commentNumber').slice(0, MOST_COMMENTED_MAX);
  render(filmsNode, getFilmsListComponent(mostCommentedFilms, true, 'MOST_COMMENTED'));
}

const onFilmListClick = (evt) => {
  const target = evt.target;
  evt.preventDefault();

  if (!target.matches('.film-card__title') && !target.matches('.film-card__poster') && !target.matches('.film-card__comments')) {
    return;
  }

  const filmCard = target.closest('.film-card');

  let filmId = null;
  if (target) {
    filmId = Number(filmCard.getAttribute('data-film-id'));
  }

  // детальная информация о фильме
  render(footerNode, getFilmDetailsComponent(filmsData.find((item) => item.filmId === filmId)), 'afterend');
  const popupFilm = getNode(`.film-details[data-film-id="${filmId}"]`);
  const popupFilmCloseButton = getNode(`.film-details[data-film-id="${filmId}"] .film-details__close-btn`);

  const onCloseButtonClick = () => {
    popupFilm.remove();
    popupFilmCloseButton.removeEventListener('click', onCloseButtonClick);
  };

  const onEscKeyDown = (evt) => {
    if (evt.key !== 'Escape') {
      return;
    }
    popupFilm.remove();
    document.removeEventListener('keydown', onEscKeyDown);
  };

  popupFilmCloseButton.addEventListener('click', onCloseButtonClick);
  document.addEventListener('keydown', onEscKeyDown);
};

const filmLists = getNodes('.films-list', mainNode);
filmLists.forEach((list) => {
  list.addEventListener('click', onFilmListClick);
});

// ---------------------------------------------------------
// кнопка показать больше
if (filmsData.length > FILM_COUNT_PER_STEP) {
  const filmsList = getNode('.films-list', mainNode);
  render(filmsList, getShowMoreComponent());

  const showMoreButton = getNode('.films-list__show-more', filmsList);
  let renderedFilmsCount = FILM_COUNT_PER_STEP;

  const filmsContainer = getNode('.films-list__container', filmsList);

  const onShowMoreClick = (evt) => {
    evt.preventDefault();

    filmsData.slice(renderedFilmsCount, renderedFilmsCount + FILM_COUNT_PER_STEP).forEach((filmData) => {
      render(filmsContainer, getFilmCardComponent(filmData));
    });
    renderedFilmsCount += FILM_COUNT_PER_STEP;

    if (renderedFilmsCount >= filmsData.length) {
      showMoreButton.remove();
      showMoreButton.removeEventListener('click', onShowMoreClick);
    }
  };

  showMoreButton.addEventListener('click', onShowMoreClick);
}
