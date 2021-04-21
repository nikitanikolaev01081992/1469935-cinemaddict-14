import { createElementFromTemplate, getNode } from '../util.js';
import { FilmListTitle, CSS_HIDDEN_CLASS } from '../constants.js';
import FilmCardView from './filmCard.js';

// ---------------------------------------------------------
export const getFilmsListTemplate = (filmsNumber = 0, extra = false, listType = 'DEFAULT') => {
  const extraClass = extra ? 'films-list--extra' : '';

  return `<section class="films-list ${extraClass}">
    <h2 class="films-list__title ${listType === 'DEFAULT' ? CSS_HIDDEN_CLASS : ''}">
      ${FilmListTitle[listType]}
    </h2>

    <div class="films-list__container">
      ${filmsNumber === 0 ? 'There are no movies in our database' : ''}
    </div>

  </section>`;
};

// ---------------------------------------------------------
export default class FilmList {
  constructor(filmsData, extra, listType) {
    this._filmsData = filmsData;
    this._extra = extra;
    this._listType = listType;
  }

  getTemplate() {
    return getFilmsListTemplate(this._filmsData.length, this._extra, this._listType);
  }

  getElement() {
    if (!this._element) {
      this._element = createElementFromTemplate(this.getTemplate());

      this.filmsContainer = getNode('.films-list__container', this._element);
      this._filmsData.forEach((filmData) => {
        this.filmsContainer.append(new FilmCardView(filmData).getElement());
      });
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
