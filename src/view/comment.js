import ComponentView from './abstract.js';
import { parseDateObject } from '../utils/common.js';
import he from 'he';

// ---------------------------------------------------------
export const getCommentTemplate = (data) => {
  const { commentId, text, emotion, author, date } = data;
  return `
  <li class="film-details__comment" data-comment-id="${commentId}">
    <span class="film-details__comment-${emotion}">
      <img src="./images/emoji/${emotion}.png" width="55" height="55" alt="emoji-${emotion}">
    </span>
    <div>
      <p class="film-details__comment-text">${he.encode(text)}</p>
      <p class="film-details__comment-info">
        <span class="film-details__comment-author">${he.encode(author)}</span>
        <span class="film-details__comment-day">${parseDateObject(date, 'YYYY/MM/DD HH:mm')}</span>
        <button class="film-details__comment-delete">Delete</button>
      </p>
    </div>
  </li>`;
};

// ---------------------------------------------------------
export default class Comment extends ComponentView {
  constructor(data) {
    super();
    this._data = data;
    this._element = this.getElement();
    this._callbacks = {};

    this._handleClick = this._handleClick.bind(this);
  }

  getTemplate() {
    return getCommentTemplate(this._data);
  }

  _handleClick(evt) {
    const commentElement = this._element;

    if (!evt.target.matches('.film-details__comment-delete') || !commentElement || !commentElement.hasAttribute('data-comment-id')) {
      return;
    }

    evt.preventDefault();

    const commentId = commentElement.getAttribute('data-comment-id');

    this._callbacks.click(commentId);
  }

  setClickHandler(callback) {
    this._callbacks.click = callback;

    this._element.addEventListener('click', this._handleClick);
  }
}
