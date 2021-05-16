import { renderElement, renderElements } from '../utils/render.js';
import { getNode, removeNode } from '../utils/nodes.js';

import FilmDetailsView from '../view/film-details.js';
import CommentView from '../view/comment.js';
import { ActionType } from '../constants.js';

export default class FilmDetails {
  constructor(container, changeData) {
    this._container = container;
    this._changeData = changeData;
    this._filmDetailsComponent = null;

    this._handleControlsClick = this._handleControlsClick.bind(this);
    this._handleClose = this._handleClose.bind(this);
    this._handleEmojiClick = this._handleEmojiClick.bind(this);
    this._handleCommentDelete = this._handleCommentDelete.bind(this);
    this._handleCommentSubmit = this._handleCommentSubmit.bind(this);
  }

  init(filmData, commentsData) {
    this._film = filmData;
    this._comments = commentsData;

    if (this._filmDetailsComponent === null) {
      this._filmDetailsComponent = new FilmDetailsView(this._film);
      this._filmDetailsComponent.setControlsClickHandler(this._handleControlsClick);
      this._filmDetailsComponent.setCloseHandlers(this._handleClose);
      this._filmDetailsComponent.setEmojiClickHandler(this._handleEmojiClick);
      this._filmDetailsComponent.setCommentSubmitHandler(this._handleCommentSubmit);

      renderElement(this._container, this._filmDetailsComponent);
    } else {
      this._filmDetailsComponent.updateElement(this._film);
    }

    // рендерим комментарии к фильму
    this._renderComments();
  }

  _renderComments() {
    const commentsContainer = getNode('.film-details__comments-list', this._filmDetailsComponent);

    const commentComponents = this._comments.map((comment) => {
      const commentComponent = new CommentView(comment);
      commentComponent.setClickHandler(this._handleCommentDelete);
      return commentComponent;
    });

    renderElements(commentsContainer, commentComponents);
  }

  _handleClose() {
    removeNode(this._filmDetailsComponent);
    this._filmDetailsComponent = null;
  }

  _handleControlsClick(newData) {
    //this._renderComments();
    this._film = Object.assign({}, this._film, newData);
    this._changeData(ActionType.UPDATE_FILM, this._film);
  }

  _handleEmojiClick() {
    this._renderComments();
  }

  _handleCommentDelete(commentId) {
    this._changeData(ActionType.DELETE_COMMENT, { commentId });
  }

  _handleCommentSubmit(comment) {
    this._changeData(ActionType.ADD_COMMENT, comment);
  }

  getComponent() {
    return this._filmDetailsComponent;
  }
}
