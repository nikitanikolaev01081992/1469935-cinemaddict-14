import { FilterType, UpdateType } from '../constants.js';
import { RenderPosition, renderElement, renderElements } from '../utils/render.js';

import MenuView from '../view/menu.js';
import FilterView from '../view/filter.js';

// ---------------------------------------------------------
export default class Filters {
  constructor(container, filtersModel, filmsModel) {
    this._menuContainer = container;

    this._filtersModel = filtersModel;
    this._filmsModel = filmsModel;

    this._menuComponent = new MenuView();

    this._handleFilterTypeChange = this._handleFilterTypeChange.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);

    this._filtersModel.addObserver(this._handleModelEvent);
    this._filmsModel.addObserver(this._handleModelEvent);
  }

  init() {
    this._renderMenu();
  }

  _getFilms() {
    return this._filmsModel.getFilms();
  }

  _renderMenu() {
    renderElement(this._menuContainer, this._menuComponent, RenderPosition.AFTER_BEGIN);
    this._menuComponent.setFilterTypeChange(this._handleFilterTypeChange);

    this._renderFilters();
  }

  _handleFilterTypeChange(newFilterType) {
    if (this._filtersModel.getFilter() === FilterType[newFilterType]) {
      return;
    }

    this._filtersModel.updateFilter(UpdateType.MAJOR, FilterType[newFilterType]);
  }

  _handleModelEvent() {
    this._renderFilters();
  }

  _renderFilters() {
    this._menuComponent.clearFilters();

    // render filters
    const filtersComponents = Object.keys(FilterType).map((filterType) => {
      const filter = FilterType[filterType];
      let count;
      switch (filter) {
        case FilterType.ALL:
          count = this._getFilms().length;
          break;
        case FilterType.WATCHLIST:
          count = this._getFilms().filter((film) => film.isInWatchlist).length;
          break;
        case FilterType.HISTORY:
          count = this._getFilms().filter((film) => film.isInHistory).length;
          break;
        case FilterType.FAVOURITES:
          count = this._getFilms().filter((film) => film.isInFavourite).length;
          break;
      }

      const isActive = filter === this._filtersModel.getFilter();
      return new FilterView({ filterType, isActive, count });
    });

    renderElements(this._menuComponent.getFiltersContainer(), filtersComponents);
  }
}
