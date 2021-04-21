import { createElementFromTemplate, getNode } from '../util.js';
import FilterView from './filter.js';

// ---------------------------------------------------------
export const getMenuTemplate = () => {
  return `<nav class="main-navigation">
  <div class="main-navigation__items">
    <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
  </div>
  <a href="#stats" class="main-navigation__additional">Stats</a>
</nav>`;
};

// ---------------------------------------------------------
export default class Menu {
  constructor(filters) {
    this._filters = filters;
  }

  getTemplate() {
    return getMenuTemplate();
  }

  getElement() {
    if (!this._element) {
      this._element = createElementFromTemplate(this.getTemplate());

      this.filtersContainer = getNode('.main-navigation__items', this._element);
      this._filters.forEach((filterData) => {
        this.filtersContainer.append(new FilterView(filterData).getElement());
      });
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
