import ComponentView from './abstract.js';
import { FilmListTitle, CSS_HIDDEN_CLASS } from '../constants.js';

// ---------------------------------------------------------
export const getFilmsListTemplate = (extra = false, listType = 'DEFAULT') => {
  const extraClass = extra ? 'films-list--extra' : '';

  return `<section class="films-list ${extraClass}">
    <h2 class="films-list__title ${listType === 'DEFAULT' ? CSS_HIDDEN_CLASS : ''}">
      ${FilmListTitle[listType]}
    </h2>

    <div class="films-list__container">
    </div>

  </section>`;
};

// ---------------------------------------------------------
export default class FilmList extends ComponentView {
  constructor(extra, listType) {
    super();
    this._extra = extra;
    this._listType = listType;
    this._callback = {};

    this._clickHandler = this._clickHandler.bind(this);
  }

  getTemplate() {
    return getFilmsListTemplate(this._extra, this._listType);
  }

  _clickHandler(evt) {
    evt.preventDefault();
    this._callback.click(evt);
  }

  setClickHandler(callback) {
    this._callback.click = callback;
    this.getElement().addEventListener('click', this._clickHandler);
  }
}
