import Observer from '../utils/obsever';
import { FilterType } from '../constants.js';

export default class Filter extends Observer {
  constructor() {
    super();
    this._currentFilter = FilterType.ALL;
  }

  setFilter(filter) {
    this._currentFilter = filter;
  }

  getFilter() {
    return this._currentFilter;
  }

  updateFilter(updateType, newFilter) {
    this._currentFilter = newFilter;
    this._notify(updateType, newFilter);
  }
}
