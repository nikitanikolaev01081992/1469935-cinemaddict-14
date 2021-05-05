import { CSS_FILMS_CONTAINER_CLASS, SortType } from '../constants.js';
import { RenderPosition, renderElement, renderElements } from '../utils/render.js';
import { getNode, removeNode } from '../utils/nodes.js';
import { sortArrayOfObjects, sortFilmsByDateDown, sortFilmsByRatingDown, updateFilm, removePresenter } from '../utils/common.js';

import FilmListView from '../view/filmsList.js';
import EmptyFilmListView from '../view/emptyFilmList.js';

import ShowMoreView from '../view/showMoreButton.js';
import MenuView from '../view/menu.js';
import FilterView from '../view/filter.js';
import SortView from '../view/sort.js';

import FilmPresenter from './film.js';
import FilmDetailsPresenter from './filmDetails.js';

// ---------------------------------------------------------
// CONSTANTS
const FILM_COUNT_PER_STEP = 5;

const TOP_RATED_MAX = 2;
const MOST_COMMENTED_MAX = 2;

// ---------------------------------------------------------
const filmToFilterMap = {
  watchlist: (films) => films.filter((film) => film.isInWatchlist).length,
  history: (films) => films.filter((film) => film.isInHistory).length,
  favorites: (films) => films.filter((film) => film.isInFavourite).length,
};

// ---------------------------------------------------------
export default class FilmsBoard {
  constructor(mainContainer) {
    if (!mainContainer) {
      throw new Error('FilmsBoard: требуется передать html контейнер');
    }

    this._mainContainer = mainContainer;
    this._boardContainer = getNode('.main', this._mainContainer);
    this._filmListsContainer = getNode('.films', this._boardContainer);

    this._renderedFilmsCount = FILM_COUNT_PER_STEP;

    this._bindHandlers();

    this._createPresenters();

    this._createComponents();

    this._sortMode = SortType.DEFAULT;
  }

  init(films) {
    this._initialFilms = films.slice();
    this._films = films.slice();
    this._topRatedFilms = sortArrayOfObjects(this._films, 'rating');
    this._mostCommentedFilms = sortArrayOfObjects(this._films, 'commentNumber');

    this._renderFilmsBoard();
  }

  _createPresenters() {
    this._filmsPresenters = {}; // {<<filmId>>: [<<FilmPresenter>>]}
    this._filmDetailsPresenter = new FilmDetailsPresenter(this._mainContainer, this._handleFilmChange);
  }

  _createComponents() {
    this._menuComponent = new MenuView();

    this._sortComponent = new SortView();
    this._sortComponent.setClickHandler(this._handleSortTypeChange);

    this._allFilmListComponent = new FilmListView();
    this._topRatedFilmListComponent = new FilmListView(true, 'TOP_RATED');
    this._mostCommentedFilmListComponent = new FilmListView(true, 'MOST_COMMENTED');

    this._showMoreButtonComponent = new ShowMoreView();
  }

  _bindHandlers() {
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
    this._handleFilmChange = this._handleFilmChange.bind(this);
    this._handleFilmListClick = this._handleFilmListClick.bind(this);
    this._handleShowMoreButtonClick = this._handleShowMoreButtonClick.bind(this);
  }

  _handleSortTypeChange(sortType) {
    if (this._sortMode === sortType) {
      return;
    }

    this._sortMode = sortType;

    switch (sortType) {
      case SortType.DATE_DOWN:
        this._films = sortFilmsByDateDown(this._initialFilms);
        break;
      case SortType.RATING_DOWN:
        this._films = sortFilmsByRatingDown(this._initialFilms);
        break;
      default:
        this._films = this._initialFilms.slice();
    }

    // очистим список фильмов перед рендеров сортированного списка
    this._clearFilms();
    removeNode(this._showMoreButtonComponent);

    // отрендерить основной список фильмов
    this._renderedFilmsCount = FILM_COUNT_PER_STEP;
    this._renderAllFilms(0, Math.min(this._films.length, FILM_COUNT_PER_STEP));

    if (this._films.length > FILM_COUNT_PER_STEP) {
      this._renderShowMoreButton();
    }
  }

  _handleFilmChange(changedFilm) {
    this._films = updateFilm(this._films, changedFilm);

    this._filmsPresenters[changedFilm.filmId].forEach((presenter) => {
      presenter.init(changedFilm);
    });

    this._updateMenu();
  }

  _handleFilmListClick(evt) {
    const target = evt.target;

    if (!target.matches('.film-card__title') && !target.matches('.film-card__poster') && !target.matches('.film-card__comments')) {
      return;
    }

    const filmCard = target.closest('.film-card');

    if (!filmCard || !filmCard.hasAttribute('data-film-id')) {
      return;
    }

    const filmId = Number(filmCard.getAttribute('data-film-id'));
    const filmData = this._films.find((item) => item.filmId === filmId);

    // фильм не найден в данных, что-то не так
    if (filmData === undefined) {
      return;
    }

    this._renderFilmDetails(filmData);
  }

  _renderFilmDetails(film) {
    this._filmDetailsPresenter.init(film);
  }

  _renderFilmLists() {
    if (this._films.length === 0) {
      this._renderEmptyFilmList();
      return;
    }

    // отрендерить основной список фильмов
    renderElement(this._filmListsContainer, this._allFilmListComponent);
    this._renderAllFilms(0, Math.min(this._films.length, FILM_COUNT_PER_STEP));

    if (this._films.length > FILM_COUNT_PER_STEP) {
      this._renderShowMoreButton();
    }

    // отрендерить top rated фильмы
    renderElement(this._filmListsContainer, this._topRatedFilmListComponent);
    this._renderTopRatedFilms(0, Math.min(this._topRatedFilms.length, TOP_RATED_MAX));

    // отрендерить most commented фильмы
    renderElement(this._filmListsContainer, this._mostCommentedFilmListComponent);
    this._renderMostCommentedFilms(0, Math.min(this._mostCommentedFilms.length, MOST_COMMENTED_MAX));

    // навесим обработчки кликов на списки фильмов
    [this._allFilmListComponent, this._topRatedFilmListComponent, this._mostCommentedFilmListComponent].forEach((view) => {
      view.setClickHandler(this._handleFilmListClick);
    });
  }

  _renderAllFilms(from, to) {
    this._renderFilms(this._films.slice(from, to), this._allFilmListComponent);
  }

  _renderTopRatedFilms(from, to) {
    this._renderFilms(this._topRatedFilms.slice(from, to), this._topRatedFilmListComponent);
  }

  _renderMostCommentedFilms(from, to) {
    this._renderFilms(this._mostCommentedFilms.slice(from, to), this._mostCommentedFilmListComponent);
  }

  _renderFilms(films, view) {
    // рендер фильмов в списке
    const filmsContainer = getNode(`.${CSS_FILMS_CONTAINER_CLASS}`, view);
    films.forEach((film) => this._renderFilm(filmsContainer, film));
  }

  _renderFilm(container, film) {
    const filmPresenter = new FilmPresenter(container, this._handleFilmChange);

    // презентеров этого фильма ещё нет,
    // надо создать пустой массив для дальнейшего добавления
    if (this._filmsPresenters[film.filmId] === undefined) {
      this._filmsPresenters[film.filmId] = [];
    }

    this._filmsPresenters[film.filmId].push(filmPresenter);
    filmPresenter.init(film);
  }

  _clearFilms() {
    this._films.forEach((film) => this._clearFilm(film));
  }

  _clearFilm(film) {
    // нет презентера для такого фильма либо фильм не отрендерен
    if (this._filmsPresenters[film.filmId] === undefined) {
      return;
    }

    const filmsContainer = getNode(`.${CSS_FILMS_CONTAINER_CLASS}`, this._allFilmListComponent);

    for (const presenter of this._filmsPresenters[film.filmId]) {
      // только для фильмов в главном списке
      if (presenter.getComponent() !== null && filmsContainer.contains(presenter.getComponent().getElement())) {
        presenter.destroy();
        this._filmsPresenters[film.filmId] = removePresenter(this._filmsPresenters[film.filmId], presenter);
        break;
      }
    }
  }

  _renderEmptyFilmList() {
    this._emltyFilmListComponent = new EmptyFilmListView();
    renderElement(this._filmListsContainer, this._emltyFilmListComponent);
  }

  _handleShowMoreButtonClick() {
    // рендер ешё группы фильмов в списке
    this._renderAllFilms(this._renderedFilmsCount, this._renderedFilmsCount + FILM_COUNT_PER_STEP);

    // увеличиваем число уже отрендеренных фильмов
    this._renderedFilmsCount += FILM_COUNT_PER_STEP;

    // если больше нечего рендерить, то убираем хендлеры и удаляем кнопку 'Show-more'
    if (this._renderedFilmsCount >= this._films.length) {
      this._showMoreButtonComponent.removeClickHandler();
      removeNode(this._showMoreButtonComponent);
    }
  }

  _renderShowMoreButton() {
    renderElement(this._allFilmListComponent, this._showMoreButtonComponent);
    this._showMoreButtonComponent.setClickHandler(this._handleShowMoreButtonClick);
  }

  _renderMenu() {
    renderElement(this._boardContainer, this._menuComponent, RenderPosition.AFTER_BEGIN);
    this._renderFilters();
  }

  _updateMenu() {
    // get old menu from DOM
    const renderedMenu = this._menuComponent.getElement();

    // clear element in menu View and create new element with default template
    this._menuComponent.removeElement();
    const clearedMenu = this._menuComponent.getElement();

    // replace in DOM old menu with new cleared menu
    renderedMenu.replaceWith(clearedMenu);

    // render all filters again
    this._renderFilters();
  }

  _renderFilters() {
    const filtersContainer = getNode('.main-navigation__items', this._menuComponent.getElement());

    // render filters
    const filtersComponents = Object.entries(filmToFilterMap)
      .map(([filterName, countFilms]) => ({ filterName, count: countFilms(this._films) }))
      .map((data) => new FilterView(data));

    renderElements(filtersContainer, filtersComponents);
  }

  _renderSort() {
    renderElement(this._boardContainer, this._sortComponent, RenderPosition.AFTER_BEGIN);
  }

  _renderFilmsBoard() {
    // отрендерить меню с фильтрами
    this._renderMenu();

    // отрендерить сортировки
    this._renderSort();

    // отрендерить списки фильмов
    this._renderFilmLists();
  }
}
