import { CSS_HIDE_OVERFLOW_CLASS } from '../constants.js';
import { renderElement, renderElements, replaceElement } from '../utils/render.js';
import { getNode, removeNode } from '../utils/nodes.js';

import FilmDetailsView from '../view/film-details.js';
import CommentView from '../view/comment.js';

export default class FilmDetails {
  constructor(container, changeData) {
    this._container = container;
    this._changeData = changeData;
    this._filmDetailsComponent = null;

    this._handleControlsClick = this._handleControlsClick.bind(this);
    this._handleClose = this._handleClose.bind(this);
  }

  init(film) {
    this._film = film;

    const oldFilmDetailsComponent = this._filmDetailsComponent;
    this._filmDetailsComponent = new FilmDetailsView(this._film);
    this._filmDetailsComponent.setClickHandler(this._handleControlsClick);
    this._filmDetailsComponent.setCloseHandler(this._handleClose);

    // детали фильма новые
    if (oldFilmDetailsComponent === null) {
      renderElement(this._container, this._filmDetailsComponent);
    }

    // обновление данных
    if (oldFilmDetailsComponent !== null && this._filmContainer.contains(oldFilmDetailsComponent.getElement())) {
      replaceElement(oldFilmDetailsComponent, this._filmDetailsComponent);
    }

    // рендерим комментарии к фильму
    this._renderComments();

    // дет. информация отрендерена, надо убрать полосу прокрутки у body
    this._container.classList.add(CSS_HIDE_OVERFLOW_CLASS);
  }

  _renderComments() {
    const commentsContainer = getNode('.film-details__comments-list', this._filmDetailsComponent);
    const commentComponents = this._film.comments.map((commentData) => new CommentView(commentData));

    renderElements(commentsContainer, commentComponents);
  }

  _handleClose() {
    removeNode(this._filmDetailsComponent);
    this._filmDetailsComponent = null;

    // вернём полосу прокрутки у body обратно
    this._container.classList.remove(CSS_HIDE_OVERFLOW_CLASS);
  }

  _handleControlsClick(evt) {
    const target = evt.target;

    if (!target.matches('.film-details__control-label')) {
      return;
    }

    let propertyToChange;
    if (target.classList.contains('film-details__control-label--watchlist')) {
      propertyToChange = 'isInWatchlist';
    } else if (target.classList.contains('film-details__control-label--watched')) {
      propertyToChange = 'isInHistory';
    } else if (target.classList.contains('film-details__control-label--favorite')) {
      propertyToChange = 'isInFavourite';
    }

    this._changeData(Object.assign({}, this._film, { [propertyToChange]: !this._film[propertyToChange] }));
  }
}
