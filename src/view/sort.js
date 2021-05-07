import { createElementFromTemplate } from '../utils/render.js';
import ComponentView from './abstract-component.js';
import { SortType } from '../constants.js';
import { getNode } from '../utils/nodes.js';

// ---------------------------------------------------------
export const getSortTemplate = () => {
  return `<ul class="sort">
    <li><a href="#" class="sort__button sort__button--active" data-sort-type="${SortType.DEFAULT}">Sort by default</a></li>
    <li><a href="#" class="sort__button" data-sort-type="${SortType.DATE_DOWN}">Sort by date</a></li>
    <li><a href="#" class="sort__button" data-sort-type="${SortType.RATING_DOWN}">Sort by rating</a></li>
  </ul>`;
};

// ---------------------------------------------------------
export default class Sorts extends ComponentView {
  constructor() {
    super();
    this._element = createElementFromTemplate(this.getTemplate());
    this._callbacks = {};
    this._handleClick = this._handleClick.bind(this);
  }

  getTemplate() {
    return getSortTemplate();
  }

  _handleClick(evt) {
    if (!evt.target.matches('a') || !evt.target.hasAttribute('data-sort-type')) {
      return;
    }

    evt.preventDefault();

    const activeSortButton = getNode('.sort__button--active', this._element);
    activeSortButton.classList.remove('sort__button--active');
    evt.target.classList.add('sort__button--active');

    const sortType = evt.target.getAttribute('data-sort-type');
    this._callbacks.click(sortType);
  }

  setClickHandler(callback) {
    this._callbacks.click = callback;
    this._element.addEventListener('click', this._handleClick);
  }
}
