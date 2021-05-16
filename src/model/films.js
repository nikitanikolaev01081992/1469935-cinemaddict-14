import Observer from '../utils/obsever.js';

export default class Films extends Observer {
  constructor() {
    super();
    this._films = [];
  }

  setFilms(films) {
    this._films = films.slice();
  }

  getFilms() {
    return this._films;
  }

  getFilm(filmId) {
    return this._films.find((item) => item.filmId === filmId);
  }

  updateFilm(updateType, updatedFilm) {
    const index = this._films.findIndex((film) => film.filmId === updatedFilm.filmId);

    if (index === -1) {
      return;
    }

    this._films = [...this._films.slice(0, index), updatedFilm, ...this._films.slice(index + 1)];

    this._notify(updateType, updatedFilm.filmId);
  }
}
