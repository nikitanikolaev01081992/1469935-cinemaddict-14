import SmartView from './smart.js';
import { capitalizeFirstLetter, parseDateObject, parseDuration } from '../utils/common.js';
import { getNode } from '../utils/nodes.js';

// ---------------------------------------------------------
const getGenreTemplate = (genre) => {
  return `<span class="film-details__genre">${genre}</span>`;
};

// ---------------------------------------------------------
export const getFilmDetailsTemplate = (data) => {
  const {
    filmId,
    date,
    poster,
    ageLimit,
    name,
    originalName,
    rating,
    director,
    screenwriters,
    actors,
    duration,
    country,
    genres,
    fullDescription,
    commentNumber,
    emoji,
    commentValue,
  } = data;

  // prettier-ignore
  return `<section class="film-details" data-film-id="${filmId}">
    <form class="film-details__inner" action="" method="get">
      <div class="film-details__top-container">
        <div class="film-details__close">
          <button class="film-details__close-btn" type="button">close</button>
        </div>
        <div class="film-details__info-wrap">
          <div class="film-details__poster">
            <img class="film-details__poster-img" src="${poster}" alt="">

            <p class="film-details__age">${ageLimit}</p>
          </div>

          <div class="film-details__info">
            <div class="film-details__info-head">
              <div class="film-details__title-wrap">
                <h3 class="film-details__title">${capitalizeFirstLetter(name)}</h3>
                <p class="film-details__title-original">Original: ${capitalizeFirstLetter(originalName)}</p>
              </div>

              <div class="film-details__rating">
                <p class="film-details__total-rating">${rating}</p>
              </div>
            </div>

            <table class="film-details__table">
              <tr class="film-details__row">
                <td class="film-details__term">Director</td>
                <td class="film-details__cell">${director}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Writers</td>
                <td class="film-details__cell">${screenwriters.join(', ')}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Actors</td>
                <td class="film-details__cell">${actors.join(', ')}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Release Date</td>
                <td class="film-details__cell">${parseDateObject(date)}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Runtime</td>
                <td class="film-details__cell">${parseDuration(duration)}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Country</td>
                <td class="film-details__cell">${country}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Genre${genres.length > 1 ? 's' : ''}</td>
                <td class="film-details__cell">
                  ${genres.map(getGenreTemplate).join('')}
                </td>
              </tr>
            </table>

            <p class="film-details__film-description">
              ${fullDescription}
            </p>
          </div>
        </div>

        <section class="film-details__controls">
          <input type="checkbox" class="film-details__control-input visually-hidden" id="watchlist" name="watchlist">
          <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist">Add to watchlist</label>

          <input type="checkbox" class="film-details__control-input visually-hidden" id="watched" name="watched">
          <label for="watched" class="film-details__control-label film-details__control-label--watched">Already watched</label>

          <input type="checkbox" class="film-details__control-input visually-hidden" id="favorite" name="favorite">
          <label for="favorite" class="film-details__control-label film-details__control-label--favorite">Add to favorites</label>
        </section>
      </div>

      <div class="film-details__bottom-container">
        <section class="film-details__comments-wrap">
          <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${commentNumber}</span></h3>

          <ul class="film-details__comments-list">
          </ul>

          <div class="film-details__new-comment">
            <div class="film-details__add-emoji-label">
                ${!emoji ? '' : `<img src="./images/emoji/${emoji}.png" width="55" height="55" alt="emoji-${emoji}">`}
            </div>

            <label class="film-details__comment-label">
              <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment">${!commentValue ? '' : commentValue}</textarea>
            </label>

            <div class="film-details__emoji-list">
              <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="smile">
              <label class="film-details__emoji-label" for="emoji-smile">
                <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
              </label>

              <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping">
              <label class="film-details__emoji-label" for="emoji-sleeping">
                <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
              </label>

              <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-puke" value="puke">
              <label class="film-details__emoji-label" for="emoji-puke">
                <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
              </label>

              <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="angry">
              <label class="film-details__emoji-label" for="emoji-angry">
                <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
              </label>
            </div>
          </div>
        </section>
      </div>
    </form>
  </section>`;
};

// ---------------------------------------------------------
export default class FilmDetails extends SmartView {
  constructor(film) {
    super();
    this._state = FilmDetails.parseFilmToState(film);
    this._callbacks = {};
    this._element = this.getElement();

    this._handleClick = this._handleClick.bind(this);
    this._handleCloseButtonClick = this._handleCloseButtonClick.bind(this);
    this._handleEscKeyDown = this._handleEscKeyDown.bind(this);
    this._handleEmojiClick = this._handleEmojiClick.bind(this);
    this._handleCommentInput = this._handleCommentInput.bind(this);

    this._setCommentHandler();
  }

  getTemplate() {
    return getFilmDetailsTemplate(this._state);
  }

  _handleClick(evt) {
    evt.preventDefault();
    this._callbacks.click(evt);
  }

  setClickHandler(callback) {
    this._callbacks.click = callback;
    this._element.addEventListener('click', this._handleClick);
  }

  _handleCloseButtonClick(evt) {
    evt.preventDefault();
    this._removeCloseHandlers();
    this._callbacks.close(evt);
  }

  _handleEscKeyDown(evt) {
    if (evt.key !== 'Escape') {
      return;
    }
    this._removeCloseHandlers();
    this._callbacks.close(evt);
  }

  setCloseHandlers(callback) {
    this._callbacks.close = callback;

    const popupFilmCloseButton = getNode('.film-details__close-btn', this._element);

    popupFilmCloseButton.addEventListener('click', this._handleCloseButtonClick);
    document.addEventListener('keydown', this._handleEscKeyDown);
  }

  _handleEmojiClick(evt) {
    const target = evt.target.closest('.film-details__emoji-label');
    if (!target) {
      return;
    }

    const inputId = target.getAttribute('for');
    const targetValue = getNode(`#${inputId}`, this._element).value;

    // значение старое, ничего делать не надо
    if (this._state.emoji === targetValue) {
      return;
    }

    // элемент будет пересоздан, надо убрать старые хендлеры
    this._removeCloseHandlers();

    this.updateData({ emoji: targetValue });

    this._callbacks.emojiClick();
  }

  setEmojiClickHandler(callback) {
    this._callbacks.emojiClick = callback;
    getNode('.film-details__emoji-list', this._element).addEventListener('click', this._handleEmojiClick);
  }

  _handleCommentInput(evt) {
    evt.preventDefault();
    this.updateData({ commentValue: evt.target.value }, true);
  }

  _setCommentHandler() {
    getNode('.film-details__comment-input', this._element).addEventListener('change', this._handleCommentInput);
  }

  updateElement() {
    const prevElement = this._element;
    const prevElementScrollTop = prevElement.scrollTop;

    this.removeElement();

    const newElement = this.getElement();

    prevElement.replaceWith(newElement);

    // это надо сделать после всех оперций, чтобы успели отрендериться комментарии
    setTimeout(() => {
      newElement.scrollTop = prevElementScrollTop;
    }, 0);

    // надо заполнить значение скрытого поля ввода
    getNode(`#emoji-${this._state.emoji}`, this.getElement()).setAttribute('checked', true);

    // надо восстановить обработчики, т.к. был создан новый элемент
    this.restoreHandlers();
  }

  _removeCloseHandlers() {
    getNode('.film-details__close-btn', this._element).removeEventListener('click', this._handleCloseButtonClick);
    document.removeEventListener('keydown', this._handleEscKeyDown);
    getNode('.film-details__emoji-list', this._element).addEventListener('click', this._handleEmojiClick);
  }

  restoreHandlers() {
    this.setClickHandler(this._callbacks.click);
    this.setCloseHandlers(this._callbacks.close);
    this.setEmojiClickHandler(this._callbacks.emojiClick);
    this._setCommentHandler();
  }

  static parseFilmToState(film) {
    return Object.assign({}, film, { emoji: null });
  }
}
