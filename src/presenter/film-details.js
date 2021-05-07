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
    this._handleEmojiClick = this._handleEmojiClick.bind(this);
  }

  init(film) {
    this._film = film;

    const oldFilmDetailsComponent = this._filmDetailsComponent;
    this._filmDetailsComponent = new FilmDetailsView(this._film);
    this._filmDetailsComponent.setControlsClickHandler(this._handleControlsClick);
    this._filmDetailsComponent.setCloseHandlers(this._handleClose);
    this._filmDetailsComponent.setEmojiClickHandler(this._handleEmojiClick);

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
  }

  _renderComments() {
    const commentsContainer = getNode('.film-details__comments-list', this._filmDetailsComponent);
    const commentComponents = this._film.comments.map((commentData) => new CommentView(commentData));

    renderElements(commentsContainer, commentComponents);
  }

  _handleClose() {
    removeNode(this._filmDetailsComponent);
    this._filmDetailsComponent = null;
  }

  _handleControlsClick(newData) {
    this._film = Object.assign({}, this._film, newData);
    this._changeData(Object.assign({}, this._film));
  }

  _handleEmojiClick() {
    this._renderComments();
  }
}
