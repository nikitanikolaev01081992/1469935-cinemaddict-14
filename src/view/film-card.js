import ComponentView from './abstract.js';
import { capitalizeFirstLetter, parseDuration } from '../utils/common.js';

// ---------------------------------------------------------
export const getFilmCardTemplate = (data) => {
  const {
    filmId,
    poster,
    name,
    rating,
    year,
    duration,
    genres,
    shortDescription,
    commentNumber,
    isInWatchlist,
    isInHistory,
    isInFavourite,
  } = data;

  const itemActiveCssClass = 'film-card__controls-item--active';

  return `<article class="film-card" data-film-id=${filmId}>
    <h3 class="film-card__title">${capitalizeFirstLetter(name)}</h3>
    <p class="film-card__rating">${rating}</p>
    <p class="film-card__info">
      <span class="film-card__year">${year}</span>
      <span class="film-card__duration">${parseDuration(duration)}</span>
      <span class="film-card__genre">${genres.join(', ')}</span>
    </p>
    <img src="./${poster}" alt="" class="film-card__poster">
    <p class="film-card__description">${shortDescription}</p>
    <a class="film-card__comments">${commentNumber} comment${commentNumber === 1 ? '' : 's'}</a>
    <div class="film-card__controls">
      <button
        class="film-card__controls-item button film-card__controls-item--add-to-watchlist ${isInWatchlist ? itemActiveCssClass : ''}"
        type="button"
      >
        Add to watchlist
      </button>
      <button
        class="film-card__controls-item button film-card__controls-item--mark-as-watched ${isInHistory ? itemActiveCssClass : ''}"
        type="button"
      >
        Mark as watched</button>
      <button
        class="film-card__controls-item button film-card__controls-item--favorite ${isInFavourite ? itemActiveCssClass : ''}"
        type="button"
      >
        Mark as favorite
      </button>
    </div>
  </article>`;
};

// ---------------------------------------------------------
export default class FilmCard extends ComponentView {
  constructor(data) {
    super();
    this._data = data;
    this._callbacks = {};

    this._handleClick = this._handleClick.bind(this);
  }

  getTemplate() {
    return getFilmCardTemplate(this._data);
  }

  _handleClick(evt) {
    evt.preventDefault();

    const target = evt.target;

    if (!target.matches('.film-card__controls-item')) {
      return;
    }

    let propertyToChange;
    if (target.classList.contains('film-card__controls-item--add-to-watchlist')) {
      propertyToChange = 'isInWatchlist';
    } else if (target.classList.contains('film-card__controls-item--mark-as-watched')) {
      propertyToChange = 'isInHistory';
    } else if (target.classList.contains('film-card__controls-item--favorite')) {
      propertyToChange = 'isInFavourite';
    }

    this._callbacks.click(propertyToChange);
  }

  setClickHandler(callback) {
    this._callbacks.click = callback;

    // если метод был вызван до рендера карточки фильма
    if (this._element === null) {
      this.getElement();
    }

    this._element.addEventListener('click', this._handleClick);
  }
}
