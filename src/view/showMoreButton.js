import { createElementFromTemplate } from '../util.js';

// ---------------------------------------------------------
export const getShowMoreTemplate = () => {
  return `<button class="films-list__show-more">
    Show more
  </button>`;
};

// ---------------------------------------------------------
export default class ShowMore {
  getTemplate() {
    return getShowMoreTemplate();
  }

  getElement() {
    if (!this._element) {
      this._element = createElementFromTemplate(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element.remove();
    this._element = null;
  }
}
