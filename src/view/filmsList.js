import { FilmListTitle, CSS_HIDDEN_CLASS } from '../constants.js';
import { getFilmCardComponent } from '../view/filmCard.js';

// ---------------------------------------------------------
// CONSTANTS/ENUMS
const FilmNumber = {
  DEFAULT: 5,
  TOP_RATED: 2,
  MOST_COMMENTED: 2,
};

// ---------------------------------------------------------
export const getFilmsListComponent = (extra = false, listType = 'DEFAULT') => {
  const extraClass = extra ? 'films-list--extra' : '';

  let films = '';
  for (let i = 0; i < FilmNumber[listType]; i++) {
    films = films + getFilmCardComponent();
  }

  return `<section class="films-list ${extraClass}">
    <h2 class="films-list__title ${listType === 'DEFAULT' ? CSS_HIDDEN_CLASS : ''}">
      ${FilmListTitle[listType]}
    </h2>

    <div class="films-list__container">
      ${films}
    </div>

  </section>`;
};
