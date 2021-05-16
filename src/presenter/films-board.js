import { CSS_FILMS_CONTAINER_CLASS, FilterType, SortType, ActionType, UpdateType } from '../constants.js';
import { renderElement } from '../utils/render.js';
import { getNode, removeNode } from '../utils/nodes.js';
import { sortArrayOfObjects, sortFilmsByDateDown, sortFilmsByRatingDown, filterFilms } from '../utils/common.js';

import FilmsBoardView from '../view/films-board.js';
import FilmListView from '../view/films-list.js';
import EmptyFilmListView from '../view/empty-film-list.js';

import ShowMoreView from '../view/show-more.js';

import SortView from '../view/sort.js';

import FilmPresenter from './film.js';
import FilmDetailsPresenter from './film-details.js';

// ---------------------------------------------------------
// CONSTANTS
const FILM_COUNT_PER_STEP = 5;

const TOP_RATED_MAX = 2;
const MOST_COMMENTED_MAX = 2;

// ---------------------------------------------------------
export default class FilmsBoard {
  constructor(container, filtersModel, filmsModel, commentsModel) {
    if (!container) {
      throw new Error('FilmsBoard: требуется передать html контейнер');
    }

    this._boardContainer = getNode('.main', this.container);

    this._bindHandlers();

    this._filtersModel = filtersModel;
    this._filtersModel.addObserver(this._handleModelEvent);

    this._filmsModel = filmsModel;
    this._filmsModel.addObserver(this._handleModelEvent);

    this._commentsModel = commentsModel;
    this._commentsModel.addObserver(this._handleModelEvent);

    this._createPresenters();

    this._createComponents();

    this._renderedFilmsCount = FILM_COUNT_PER_STEP;
    this._sortMode = SortType.DEFAULT;
  }

  init() {
    this._renderFilmsBoard();
  }

  _createPresenters() {
    // {all: {<<filmId>>:<<FilmPresenter>>}, topRated: {<<filmId>>:<<FilmPresenter>>}, mostCommented: {<<filmId>>:<<FilmPresenter>>}}
    this._filmsPresenters = { all: {}, topRated: {}, mostCommented: {} };

    this._filmDetailsPresenter = new FilmDetailsPresenter(document.body, this._handleViewAction);
  }

  _createComponents() {
    this._sortComponent = new SortView();

    this._filmsBoardComponent = new FilmsBoardView();

    this._emptyFilmListComponent = new EmptyFilmListView();

    this._allFilmListComponent = new FilmListView();
    this._topRatedFilmListComponent = new FilmListView(true, 'TOP_RATED');
    this._mostCommentedFilmListComponent = new FilmListView(true, 'MOST_COMMENTED');

    this._setFilmListHandlers();

    this._showMoreButtonComponent = new ShowMoreView();
  }

  _bindHandlers() {
    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleViewAction = this._handleViewAction.bind(this);

    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
    this._handleFilmListClick = this._handleFilmListClick.bind(this);
    this._handleShowMoreButtonClick = this._handleShowMoreButtonClick.bind(this);
  }

  _getFilms() {
    let films = this._filmsModel.getFilms();

    switch (this._sortMode) {
      case SortType.DATE_DOWN:
        films = sortFilmsByDateDown(films);
        break;
      case SortType.RATING_DOWN:
        films = sortFilmsByRatingDown(films);
        break;
      default:
        films = films.slice();
    }

    films = filterFilms(films, this._filtersModel.getFilter());

    // !!! временное решения обновления количества комментариев фильма
    // в дальнейшем это будет подсчитываться по данным фильма с сервера
    films = films.map((film) => {
      const comments = this._getComments(film.filmId);
      return Object.assign({}, film, { commentNumber: comments.length });
    });

    return films;
  }

  _getFilm(filmId) {
    let film = this._filmsModel.getFilms().find((film) => film.filmId === filmId);
    const comments = this._getComments(filmId);

    // !!! временное решения обновления количества комментариев фильма
    // в дальнейшем это будет подсчитываться по данным фильма с сервера
    film = Object.assign({}, film, { commentNumber: comments.length });

    return film;
  }

  _getTopRatedFilms() {
    return sortArrayOfObjects(this._getFilms(), 'rating').slice(0, TOP_RATED_MAX);
  }

  _getMostCommentedFilms() {
    return sortArrayOfObjects(this._getFilms(), 'commentNumber').slice(0, MOST_COMMENTED_MAX);
  }

  _updateFilm(updateType, film) {
    this._filmsModel.updateFilm(updateType, film);
  }

  _getComments(filmId) {
    return this._commentsModel.getCommentsById(filmId);
  }

  _addComment(updateType, newComment) {
    this._commentsModel.addComment(updateType, newComment);
  }

  _deleteComment(updateType, commentId) {
    this._commentsModel.deleteComment(updateType, commentId);
  }

  _handleViewAction(actionType, updatedData) {
    // действия во views, подконтрольных этому презентеру:
    // обновление статуса фильма в фильтрах
    // добавление комментария к фильму
    // удаление комментария из фильма

    let updateType;
    const currentFilter = this._filtersModel.getFilter();

    switch (actionType) {
      case ActionType.UPDATE_FILM:
        updateType = currentFilter === FilterType.ALL ? UpdateType.PATCH : UpdateType.MAJOR;
        this._updateFilm(updateType, updatedData);
        break;

      case ActionType.DELETE_COMMENT:
        updateType = UpdateType.MINOR;
        this._deleteComment(updateType, updatedData.commentId);
        break;

      case ActionType.ADD_COMMENT:
        updateType = UpdateType.MINOR;
        this._addComment(updateType, updatedData);
        break;
    }
  }

  _handleModelEvent(updateType, idOfUpdatedFilm) {
    let updatedFilm;
    let commentsData;

    if (idOfUpdatedFilm !== undefined) {
      updatedFilm = this._getFilm(idOfUpdatedFilm);
      commentsData = this._getComments(idOfUpdatedFilm);
    }

    // перендерить открытый попап с дет. инфой по фильму
    // если были изменения в данных
    // независимо от того какой тип изменений
    if (this._filmDetailsPresenter.getComponent()) {
      this._filmDetailsPresenter.init(updatedFilm, commentsData);
    }

    switch (updateType) {
      case UpdateType.PATCH:
        this._initFilmPresenters(updatedFilm);
        return;

      case UpdateType.MINOR:
        // удаляет компоненты most commented films
        Object.values(this._filmsPresenters.mostCommented).forEach((presenter) => presenter.destroy());

        // удаляем презентеры для most commented films
        this._filmsPresenters.mostCommented = {};

        // обновляем компонент для изменённого фильма
        this._initFilmPresenters(updatedFilm);

        // заного рендерим список most commented films
        this._renderMostCommentedFilms();
        return;

      case UpdateType.MAJOR:
        this._clearBoard(true);

        // сбросить сортировку
        this._sortMode = SortType.DEFAULT;

        // сбросить счётчик фильмов
        this._renderedFilmsCount = FILM_COUNT_PER_STEP;

        // отрендерить всё заново
        this._renderFilmsBoard();

        return;
    }
  }

  _handleSortTypeChange(sortType) {
    if (this._sortMode === sortType) {
      return;
    }

    this._sortMode = sortType;
    //this._clearSort();

    // очистим список фильмов перед рендером сортированного списка
    this._clearFilms();
    removeNode(this._showMoreButtonComponent);

    // отрендерить основной список фильмов
    this._renderedFilmsCount = FILM_COUNT_PER_STEP;
    this._renderAllFilms(0, Math.min(this._getFilms().length, FILM_COUNT_PER_STEP));

    if (this._getFilms().length > FILM_COUNT_PER_STEP) {
      this._renderShowMoreButton();
    }
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

    this._renderFilmDetails(filmId);
  }

  _renderFilmDetails(filmId) {
    const filmData = this._getFilm(filmId);
    const commentsData = this._getComments(filmId) || [];

    // фильм не найден в данных, что-то не так
    if (filmData === undefined) {
      return;
    }

    this._filmDetailsPresenter.init(filmData, commentsData);
  }

  _renderFilmLists() {
    if (this._getFilms().length === 0) {
      this._renderEmptyFilmList();
      renderElement(this._boardContainer, this._filmsBoardComponent);
      return;
    }

    // отрендерить основной список фильмов
    renderElement(this._filmsBoardComponent, this._allFilmListComponent);
    this._renderAllFilms(0, Math.min(this._getFilms().length, FILM_COUNT_PER_STEP));

    if (this._getFilms().length > FILM_COUNT_PER_STEP) {
      this._renderShowMoreButton();
    }

    // отрендерить top rated фильмы
    renderElement(this._filmsBoardComponent, this._topRatedFilmListComponent);
    this._renderTopRatedFilms();

    // отрендерить most commented фильмы
    renderElement(this._filmsBoardComponent, this._mostCommentedFilmListComponent);
    this._renderMostCommentedFilms();

    // отрендерим доску
    renderElement(this._boardContainer, this._filmsBoardComponent);
  }

  _renderAllFilms(from, to) {
    this._renderFilms(this._getFilms().slice(from, to), this._allFilmListComponent);
  }

  _renderTopRatedFilms() {
    this._renderFilms(this._getTopRatedFilms(), this._topRatedFilmListComponent);
  }

  _renderMostCommentedFilms() {
    this._renderFilms(this._getMostCommentedFilms(), this._mostCommentedFilmListComponent);
  }

  _renderFilms(films, view) {
    // рендер фильмов в списке
    const filmsContainer = getNode(`.${CSS_FILMS_CONTAINER_CLASS}`, view);
    films.forEach((film) => this._renderFilm(filmsContainer, film, view));
  }

  _renderFilm(container, film, view) {
    const filmPresenter = new FilmPresenter(container, this._handleViewAction);

    let presenterKey;

    switch (view) {
      case this._allFilmListComponent:
        presenterKey = 'all';
        break;
      case this._topRatedFilmListComponent:
        presenterKey = 'topRated';
        break;
      case this._mostCommentedFilmListComponent:
        presenterKey = 'mostCommented';
        break;
    }

    this._filmsPresenters[presenterKey][film.filmId] = filmPresenter;
    filmPresenter.init(film);
  }

  _renderEmptyFilmList() {
    renderElement(this._filmsBoardComponent, this._emptyFilmListComponent);
  }

  _setFilmListHandlers() {
    // навесим обработчки кликов на списки фильмов
    [this._allFilmListComponent, this._topRatedFilmListComponent, this._mostCommentedFilmListComponent].forEach((view) => {
      view.setClickHandler(this._handleFilmListClick);
    });
  }

  _handleShowMoreButtonClick() {
    // рендер ешё группы фильмов в списке
    this._renderAllFilms(this._renderedFilmsCount, this._renderedFilmsCount + FILM_COUNT_PER_STEP);

    // увеличиваем число уже отрендеренных фильмов
    this._renderedFilmsCount += FILM_COUNT_PER_STEP;

    // если больше нечего рендерить, то убираем хендлеры и удаляем кнопку 'Show-more'
    if (this._renderedFilmsCount >= this._getFilms().length) {
      this._showMoreButtonComponent.removeClickHandler();
      removeNode(this._showMoreButtonComponent);
    }
  }

  _renderShowMoreButton() {
    renderElement(this._allFilmListComponent, this._showMoreButtonComponent);
    this._showMoreButtonComponent.setClickHandler(this._handleShowMoreButtonClick);
  }

  _renderSort() {
    renderElement(this._boardContainer, this._sortComponent);
    this._sortComponent.setClickHandler(this._handleSortTypeChange);
  }

  _renderFilmsBoard() {
    // отрендерить сортировки
    this._renderSort();

    // отрендерить списки фильмов
    this._renderFilmLists();
  }

  _clearBoard(isClearAllLists) {
    this._clearSort();
    this._clearEmptyList();
    this._clearFilms(isClearAllLists);
    this._clearShowMore();

    removeNode(this._filmsBoardComponent);
  }

  _clearFilms(isClearAllLists = false) {
    // надо пройтись по всем фильмам
    this._filmsModel.getFilms().forEach((film) => this._clearFilm(film, isClearAllLists));
  }

  _clearFilm(film, isClearAllLists) {
    const filmId = film.filmId;

    Object.keys(this._filmsPresenters).forEach((key) => {
      if (!isClearAllLists && (key === 'topRated' || key === 'mostCommented')) {
        return;
      }

      const presenter = this._filmsPresenters[key][filmId];

      if (presenter) {
        presenter.destroy();
        delete this._filmsPresenters[key][filmId];
      }
    });
  }

  _clearSort() {
    removeNode(this._sortComponent);
  }

  _clearEmptyList() {
    removeNode(this._emptyFilmListComponent);
  }

  _clearShowMore() {
    removeNode(this._showMoreButtonComponent);
  }

  _initFilmPresenters(filmData) {
    const filmId = filmData.filmId;

    Object.keys(this._filmsPresenters).forEach((key) => {
      const presenter = this._filmsPresenters[key][filmId];

      if (presenter) {
        presenter.init(filmData);
      }
    });
  }
}
