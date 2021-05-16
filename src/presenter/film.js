import { ActionType } from '../constants.js';
import { renderElement, replaceElement } from '../utils/render.js';

import FilmCardView from '../view/film-card.js';

export default class Film {
  constructor(filmContainer, changeData) {
    this._filmContainer = filmContainer;
    this._changeData = changeData;
    this._filmComponent = null;

    this._handleControlsClick = this._handleControlsClick.bind(this);
  }

  init(film) {
    this._film = film;

    const _oldFilmComponent = this._filmComponent;
    this._filmComponent = new FilmCardView(this._film);
    this._filmComponent.setClickHandler(this._handleControlsClick);

    // карточка фильма новая
    if (_oldFilmComponent === null) {
      renderElement(this._filmContainer, this._filmComponent);
      return;
    }

    // обновление данных
    if (!this._filmContainer.contains(_oldFilmComponent.getElement())) {
      return;
    }

    replaceElement(_oldFilmComponent, this._filmComponent);
  }

  _handleControlsClick(propertyToChange) {
    this._changeData(ActionType.UPDATE_FILM, Object.assign({}, this._film, { [propertyToChange]: !this._film[propertyToChange] }));
  }

  getComponent() {
    return this._filmComponent;
  }

  destroy() {
    this._filmComponent.getElement().remove();
    this._filmComponent.removeElement();
    this._filmComponent = null;
  }
}
