import ComponentView from './abstract-component.js';

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
export default class Menu extends ComponentView {
  getTemplate() {
    return getMenuTemplate();
  }
}
