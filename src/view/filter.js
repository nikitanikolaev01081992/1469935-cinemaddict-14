import { createElementFromTemplate, capitalizeFirstLetter } from '../util.js';

// ---------------------------------------------------------
const getFilterTemplate = ({ filterName, count }) => {
  return `<a href="#watchlist" class="main-navigation__item">
    ${capitalizeFirstLetter(filterName)} <span class="main-navigation__item-count">${count}</span></a>`;
};

// ---------------------------------------------------------
export default class Filter {
  constructor(data) {
    this._data = data;
  }

  getTemplate() {
    return getFilterTemplate(this._data);
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
