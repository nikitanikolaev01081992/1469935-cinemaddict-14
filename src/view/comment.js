import ComponentView from './abstract-component.js';

// ---------------------------------------------------------
export const getCommentTemplate = (data) => {
  const { text, emotion, author, date } = data;
  return `
  <li class="film-details__comment">
    <span class="film-details__comment-${emotion}">
      <img src="./images/emoji/smile.png" width="55" height="55" alt="emoji-${emotion}">
    </span>
    <div>
      <p class="film-details__comment-text">${text}</p>
      <p class="film-details__comment-info">
        <span class="film-details__comment-author">${author}</span>
        <span class="film-details__comment-day">${date}</span>
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
  }

  getTemplate() {
    return getCommentTemplate(this._data);
  }
}
