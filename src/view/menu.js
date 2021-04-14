import { capitalizeFirstLetter } from '../util.js';

const getFilterComponent = ({ filterName, count }) => {
  return `<a href="#watchlist" class="main-navigation__item">
    ${capitalizeFirstLetter(filterName)} <span class="main-navigation__item-count">${count}</span></a>`;
};

export const getMenuComponent = (filters) => {
  return `<nav class="main-navigation">
  <div class="main-navigation__items">
    <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
    ${filters.map(getFilterComponent).join('')}
  </div>
  <a href="#stats" class="main-navigation__additional">Stats</a>
</nav>`;
};
