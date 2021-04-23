import { createElementFromTemplate } from '../util.js';

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
  constructor() {}

  getTemplate() {
    return getMenuTemplate();
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
