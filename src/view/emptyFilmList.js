import ComponentView from './abstract-component.js';

// ---------------------------------------------------------
export const getFilmsListTemplate = () => {
  return `<section class="films-list">
    <div class="films-list__container">
      There are no movies in our database
    </div>

  </section>`;
};

// ---------------------------------------------------------
export default class EmptyFilmList extends ComponentView {
  getTemplate() {
    return getFilmsListTemplate();
  }
}
