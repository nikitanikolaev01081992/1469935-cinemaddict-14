import ComponentView from './abstract.js';

// ---------------------------------------------------------
export const getRatingTemplate = (rank) => {
  return `<section class="header__profile profile">
    <p class="profile__rating">${rank}</p>
    <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
  </section>`;
};

// ---------------------------------------------------------
export default class Rating extends ComponentView {
  constructor(rank) {
    super();
    this._rank = rank;
  }

  getTemplate() {
    return getRatingTemplate(this._rank);
  }
}
