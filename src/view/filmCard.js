import ComponentView from './abstract-component.js';
import { capitalizeFirstLetter } from '../utils/common.js';

// ---------------------------------------------------------
export const getFilmCardTemplate = (data) => {
  const { filmId, poster, name, rating, year, duration, genres, shortDescription, commentNumber } = data;

  return `<article class="film-card" data-film-id=${filmId}>
    <h3 class="film-card__title">${capitalizeFirstLetter(name)}</h3>
    <p class="film-card__rating">${rating}</p>
    <p class="film-card__info">
      <span class="film-card__year">${year}</span>
      <span class="film-card__duration">${duration}</span>
      <span class="film-card__genre">${genres.join(', ')}</span>
    </p>
    <img src="./${poster}" alt="" class="film-card__poster">
    <p class="film-card__description">${shortDescription}</p>
    <a class="film-card__comments">${commentNumber} comment${commentNumber === 1 ? '' : 's'}</a>
    <div class="film-card__controls">
      <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist" type="button">Add to watchlist</button>
      <button class="film-card__controls-item button film-card__controls-item--mark-as-watched" type="button">Mark as watched</button>
      <button class="film-card__controls-item button film-card__controls-item--favorite" type="button">Mark as favorite</button>
    </div>
  </article>`;
};

// ---------------------------------------------------------
export default class FilmCard extends ComponentView {
  constructor(data) {
    super();
    this._data = data;
  }

  getTemplate() {
    return getFilmCardTemplate(this._data);
  }
}
