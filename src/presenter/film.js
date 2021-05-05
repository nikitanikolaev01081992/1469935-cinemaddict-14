import { renderElement, replaceElement } from '../utils/render.js';

import FilmCardView from '../view/filmCard.js';

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

  _handleControlsClick(evt) {
    const target = evt.target;

    if (!target.matches('.film-card__controls-item')) {
      return;
    }

    let propertyToChange;
    if (target.classList.contains('film-card__controls-item--add-to-watchlist')) {
      propertyToChange = 'isInWatchlist';
    } else if (target.classList.contains('film-card__controls-item--mark-as-watched')) {
      propertyToChange = 'isInHistory';
    } else if (target.classList.contains('film-card__controls-item--favorite')) {
      propertyToChange = 'isInFavourite';
    }

    this._changeData(Object.assign({}, this._film, { [propertyToChange]: !this._film[propertyToChange] }));
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
