import AbstractView from './abstract.js';
import { getNode } from '../utils/nodes.js';

// ---------------------------------------------------------
export const getMenuTemplate = () => {
  return `<nav class="main-navigation">
  <div class="main-navigation__items">
  </div>
  <a href="#stats" class="main-navigation__additional">Stats</a>
</nav>`;
};

// ---------------------------------------------------------
export default class Menu extends AbstractView {
  constructor() {
    super();
    this._callbacks = {};

    this._handleFilterTypeChange = this._handleFilterTypeChange.bind(this);
  }

  getTemplate() {
    return getMenuTemplate();
  }

  _handleFilterTypeChange(evt) {
    evt.preventDefault();

    const target = evt.target;

    if (!target.matches('.main-navigation__item') || !target.hasAttribute('data-filter-type')) {
      return;
    }

    const newFilter = target.getAttribute('data-filter-type');
    this._callbacks.click(newFilter);
  }

  setFilterTypeChange(callback) {
    this._callbacks.click = callback;
    this._element.addEventListener('click', this._handleFilterTypeChange);
  }

  clearFilters() {
    this.getFiltersContainer().innerHTML = '';
  }

  getFiltersContainer() {
    if (!this._filtersContainer) {
      this._filtersContainer = getNode('.main-navigation__items', this._element);
    }

    return this._filtersContainer;
  }
}
