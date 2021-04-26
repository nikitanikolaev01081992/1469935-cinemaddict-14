import ComponentView from './abstract-component.js';
import { capitalizeFirstLetter } from '../utils/common.js';

// ---------------------------------------------------------
const getFilterTemplate = ({ filterName, count }) => {
  return `<a href="#watchlist" class="main-navigation__item">
    ${capitalizeFirstLetter(filterName)} <span class="main-navigation__item-count">${count}</span></a>`;
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
