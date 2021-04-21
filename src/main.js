import { CSS_HIDE_OVERFLOW_CLASS } from './constants.js';
import { RenderPosition, getNode, renderElement, sortArrayOfObjects } from './util.js';
import RatingView from './view/rating.js';
import MenuView from './view/menu.js';
// import StatsView from './view/stats.js';
import SortsView from './view/sort.js';
import FilmListView from './view/filmsList.js';
import FilmCardView from './view/filmCard.js';
import ShowMoreView from './view/showMoreButton';
import FilmDetailsView from './view/filmDetails.js';
import TotalFilmsNumView from './view/totalFilmsNum.js';

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
//const footerNode = getNode('.footer');
const footerStatsNode = getNode('.footer__statistics');
const bodyNode = getNode('body');

// ---------------------------------------------------------

// рейтинг пользователя
renderElement(headerNode, new RatingView(userStats.rank).getElement());

// сортировка
renderElement(mainNode, new SortsView().getElement(), RenderPosition.AFTER_BEGIN);

// меню с фильтрами
renderElement(mainNode, new MenuView(filters).getElement(), RenderPosition.AFTER_BEGIN);

// общее количество фильмов
renderElement(footerStatsNode, new TotalFilmsNumView().getElement());

// статистика пользователя
// renderElement(mainNode, new StatsView(userStats).getElement(), RenderPosition.AFTER_BEGIN);

// ---------------------------------------------------------
// список фильмов
const allFilmListComponent = new FilmListView(filmsData.slice(0, FILM_COUNT_PER_STEP));
renderElement(filmsNode, allFilmListComponent.getElement());

// список фильмов top rated
let topRatedListComponent;

if (filmsData.length > 0) {
  const topRatedFilms = sortArrayOfObjects(filmsData, 'rating').slice(0, TOP_RATED_MAX);
  topRatedListComponent = new FilmListView(topRatedFilms, true, 'TOP_RATED');

  renderElement(filmsNode, topRatedListComponent.getElement());
}

// список фильмов most commented
let mostCommentedListComponent;

if (filmsData.length > 0) {
  const mostCommentedFilms = sortArrayOfObjects(filmsData, 'commentNumber').slice(0, MOST_COMMENTED_MAX);
  mostCommentedListComponent = new FilmListView(mostCommentedFilms, true, 'MOST_COMMENTED');

  renderElement(filmsNode, mostCommentedListComponent.getElement());
}

// ---------------------------------------------------------
// обработчик кликов на карточки фильмов
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
  let popupComponent = new FilmDetailsView(filmsData.find((item) => item.filmId === filmId));
  renderElement(bodyNode, popupComponent.getElement());

  // дет. информация отрендерена, надо убрать полосу прокрутки у body
  bodyNode.classList.add(CSS_HIDE_OVERFLOW_CLASS);

  const popupFilmCloseButton = getNode(`.film-details[data-film-id="${filmId}"] .film-details__close-btn`);

  const onCloseButtonClick = () => {
    popupFilmCloseButton.removeEventListener('click', onCloseButtonClick);

    popupComponent.removeElement();
    popupComponent = null;

    // вернём полосу прокрутки у body обратно
    bodyNode.classList.remove(CSS_HIDE_OVERFLOW_CLASS);
  };

  const onEscKeyDown = (evt) => {
    if (evt.key !== 'Escape') {
      return;
    }

    document.removeEventListener('keydown', onEscKeyDown);

    popupComponent.removeElement();
    popupComponent = null;

    // вернём полосу прокрутки у body обратно
    bodyNode.classList.remove(CSS_HIDE_OVERFLOW_CLASS);
  };

  popupFilmCloseButton.addEventListener('click', onCloseButtonClick);
  document.addEventListener('keydown', onEscKeyDown);
};

[allFilmListComponent, topRatedListComponent, mostCommentedListComponent].forEach((fimlListComponent) => {
  if (fimlListComponent) {
    fimlListComponent.getElement().addEventListener('click', onFilmListClick);
  }
});

// ---------------------------------------------------------
// кнопка показать больше
if (filmsData.length > FILM_COUNT_PER_STEP) {
  let showMoreComponent = new ShowMoreView();
  const showMoreButton = showMoreComponent.getElement();
  renderElement(allFilmListComponent.getElement(), showMoreComponent.getElement());

  let renderElementedFilmsCount = FILM_COUNT_PER_STEP;

  const onShowMoreClick = (evt) => {
    evt.preventDefault();

    const filmListContainer = getNode('.films-list__container', allFilmListComponent.getElement());

    filmsData.slice(renderElementedFilmsCount, renderElementedFilmsCount + FILM_COUNT_PER_STEP).forEach((filmData) => {
      renderElement(filmListContainer, new FilmCardView(filmData).getElement());
    });
    renderElementedFilmsCount += FILM_COUNT_PER_STEP;

    if (renderElementedFilmsCount >= filmsData.length) {
      showMoreButton.removeEventListener('click', onShowMoreClick);

      showMoreComponent.removeElement();
      showMoreComponent = null;
    }
  };

  showMoreButton.addEventListener('click', onShowMoreClick);
}
