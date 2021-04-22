import { createElementFromTemplate } from '../util.js';
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
export default class FilmList {
  constructor(extra, listType) {
    this._extra = extra;
    this._listType = listType;
  }

  getTemplate() {
    return getFilmsListTemplate(this._extra, this._listType);
  }

  getElement() {
    if (!this._element) {
      this._element = createElementFromTemplate(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
