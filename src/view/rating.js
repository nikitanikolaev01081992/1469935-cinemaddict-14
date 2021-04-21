import { createElementFromTemplate } from '../util.js';

// ---------------------------------------------------------
export const getRatingTemplate = (rank) => {
  return `<section class="header__profile profile">
    <p class="profile__rating">${rank}</p>
    <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
  </section>`;
};

// ---------------------------------------------------------
export default class Rating {
  constructor(rank) {
    this._rank = rank;
  }

  getTemplate() {
    return getRatingTemplate(this._rank);
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
