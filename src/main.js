import { CSS_HIDE_OVERFLOW_CLASS, CSS_FILMS_CONTAINER_CLASS } from './constants.js';
import { RenderPosition, renderElement, renderElements } from './utils/render.js';
import { getNode } from './utils/nodes.js';
import { sortArrayOfObjects } from './utils/common.js';

import RatingView from './view/rating.js';
import MenuView from './view/menu.js';
import FilterView from './view/filter.js';
// import StatsView from './view/stats.js';
import SortsView from './view/sort.js';
import FilmListView from './view/filmsList.js';
import EmptyFilmListView from './view/emptyFilmList.js';
import FilmCardView from './view/filmCard.js';
import ShowMoreView from './view/showMoreButton';
import FilmDetailsView from './view/filmDetails.js';
import CommentView from './view/comment.js';
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

// Data for filters in menu
const filtersData = generateFilters(filmsData);

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
renderElement(headerNode, new RatingView(userStats.rank));

// сортировка
renderElement(mainNode, new SortsView(), RenderPosition.AFTER_BEGIN);

// меню с фильтрами
const menuComponent = new MenuView();
renderElement(mainNode, menuComponent, RenderPosition.AFTER_BEGIN);

// фильтры в меню
const filtersContainer = getNode('.main-navigation__items');
const filters = filtersData.map((filterData) => new FilterView(filterData));
renderElements(filtersContainer, filters);

// общее количество фильмов
renderElement(footerStatsNode, new TotalFilmsNumView());

// статистика пользователя
// renderElement(mainNode, new StatsView(userStats), RenderPosition.AFTER_BEGIN);

// ---------------------------------------------------------
// список фильмов
let allFilmListComponent;
let allFilmsContainer;

if (filmsData.length > 0) {
  allFilmListComponent = new FilmListView();
  renderElement(filmsNode, allFilmListComponent);

  // рендер фильмов в списке
  allFilmsContainer = getNode(`.${CSS_FILMS_CONTAINER_CLASS}`, allFilmListComponent);
  const films = filmsData.slice(0, FILM_COUNT_PER_STEP).map((filmData) => new FilmCardView(filmData));

  renderElements(allFilmsContainer, films);
} else {
  renderElement(filmsNode, new EmptyFilmListView());
}

// список фильмов top rated
let topRatedListComponent;

if (filmsData.length > 0) {
  topRatedListComponent = new FilmListView(true, 'TOP_RATED');
  renderElement(filmsNode, topRatedListComponent);

  // рендер фильмов в списке
  const topFilmsContainer = getNode(`.${CSS_FILMS_CONTAINER_CLASS}`, topRatedListComponent);
  const topRatedFilms = sortArrayOfObjects(filmsData, 'rating')
    .slice(0, TOP_RATED_MAX)
    .map((filmData) => new FilmCardView(filmData));

  renderElements(topFilmsContainer, topRatedFilms);
}

// список фильмов most commented
let mostCommentedListComponent;

if (filmsData.length > 0) {
  mostCommentedListComponent = new FilmListView(true, 'MOST_COMMENTED');
  renderElement(filmsNode, mostCommentedListComponent);

  // рендер фильмов в списке
  const mostCommentedFilmsContainer = getNode(`.${CSS_FILMS_CONTAINER_CLASS}`, mostCommentedListComponent);
  const mostCommentedFilms = sortArrayOfObjects(filmsData, 'commentNumber')
    .slice(0, MOST_COMMENTED_MAX)
    .map((filmData) => new FilmCardView(filmData));

  renderElements(mostCommentedFilmsContainer, mostCommentedFilms);
}

// ---------------------------------------------------------
// обработчик кликов на карточки фильмов
const onFilmListClick = (evt) => {
  evt.preventDefault();
  const target = evt.target;

  if (!target.matches('.film-card__title') && !target.matches('.film-card__poster') && !target.matches('.film-card__comments')) {
    return;
  }

  const filmCard = target.closest('.film-card');

  let filmId = null;
  if (filmCard) {
    filmId = Number(filmCard.getAttribute('data-film-id'));
  }

  // html элемент не содержит аттрибут с id фильма
  if (filmId === null) {
    return;
  }

  // найдём фильм по id в наших данных фильмов
  const filmData = filmsData.find((item) => item.filmId === filmId);

  // фильм не найден в данных, что-то не так
  if (filmData === undefined) {
    return;
  }

  // детальная информация о фильме
  let popupComponent = new FilmDetailsView(filmData);
  renderElement(bodyNode, popupComponent);

  // комментарии к фильму
  const commentsContainer = getNode('.film-details__comments-list', popupComponent);
  const commentComponents = filmData.comments.map((commentData) => new CommentView(commentData));

  renderElements(commentsContainer, commentComponents);

  // дет. информация отрендерена, надо убрать полосу прокрутки у body
  bodyNode.classList.add(CSS_HIDE_OVERFLOW_CLASS);

  // повесим обработчик закрытия
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

// навешиваем обработки на списки фильмов
[allFilmListComponent, topRatedListComponent, mostCommentedListComponent].forEach((fimlListComponent) => {
  if (fimlListComponent) {
    fimlListComponent.setClickHandler(onFilmListClick);
  }
});

// ---------------------------------------------------------
// кнопка показать больше
if (filmsData.length > FILM_COUNT_PER_STEP) {
  let showMoreComponent = new ShowMoreView();
  renderElement(allFilmListComponent, showMoreComponent);

  let renderElementedFilmsCount = FILM_COUNT_PER_STEP;

  const onShowMoreClick = (evt) => {
    evt.preventDefault();

    // рендер ешё группы фильмов в списке
    const films = filmsData
      .slice(renderElementedFilmsCount, renderElementedFilmsCount + FILM_COUNT_PER_STEP)
      .map((filmData) => new FilmCardView(filmData));

    renderElements(allFilmsContainer, films);

    // увеличиваем число уже отрендеренных фильмов
    renderElementedFilmsCount += FILM_COUNT_PER_STEP;

    // если больше нечего рендерить, то убираем хендлеры и удаляем кнопку 'Show-more'
    if (renderElementedFilmsCount >= filmsData.length) {
      showMoreComponent.removeClickHandler();

      showMoreComponent.removeElement();
      showMoreComponent = null;
    }
  };

  showMoreComponent.setClickHandler(onShowMoreClick);
}
