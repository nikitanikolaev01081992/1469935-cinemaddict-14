import ComponentView from './abstract-component.js';

// ---------------------------------------------------------
export const getShowMoreTemplate = () => {
  return `<button class="films-list__show-more">
    Show more
  </button>`;
};

// ---------------------------------------------------------
export default class ShowMore extends ComponentView {
  constructor() {
    super();

    this._callback = {};
    this._clickHandler = this._clickHandler.bind(this);
  }

  getTemplate() {
    return getShowMoreTemplate();
  }

  removeElement() {
    this._element.remove();
    super.removeElement();
  }

  _clickHandler(evt) {
    evt.preventDefault();
    this._callback.click(evt);
  }

  setClickHandler(callback) {
    this._callback.click = callback;
    this.getElement().addEventListener('click', this._clickHandler);
  }

  removeClickHandler() {
    this.getElement().removeEventListener('click', this._clickHandler);
  }
}
