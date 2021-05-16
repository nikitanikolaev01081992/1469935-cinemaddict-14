import ComponentView from './abstract.js';
import { capitalizeFirstLetter } from '../utils/common.js';
import { FilterType } from '../constants.js';

// ---------------------------------------------------------
const getFilterTemplate = ({ filterType, isActive, count }) => {
  return `<a
            href="#${filterType}"
            class="main-navigation__item ${isActive ? 'main-navigation__item--active' : ''}"
            data-filter-type="${filterType}"
          >
            ${capitalizeFirstLetter(FilterType[filterType])}
            ${FilterType[filterType] === FilterType.ALL ? '' : `<span class="main-navigation__item-count">${count}</span>`}
          </a>`;
};

// ---------------------------------------------------------
export default class Filter extends ComponentView {
  constructor(data) {
    super();
    this._data = data;
  }

  getTemplate() {
    return getFilterTemplate(this._data);
  }
}
