import ComponentView from './abstract.js';

// ---------------------------------------------------------
export const getFilmsBoardTemplate = () => {
  return '<section class="films"></section>';
};

// ---------------------------------------------------------
export default class FilmsBoard extends ComponentView {
  constructor() {
    super();
  }

  getTemplate() {
    return getFilmsBoardTemplate();
  }
}
