import { createElementFromTemplate } from '../util.js';

// ---------------------------------------------------------
export const getFilmsListTemplate = () => {
  return `<section class="films-list">
    <div class="films-list__container">
      There are no movies in our database
    </div>

  </section>`;
};

// ---------------------------------------------------------
export default class EmptyFilmList {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return getFilmsListTemplate();
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
