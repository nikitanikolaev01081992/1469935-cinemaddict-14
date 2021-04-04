import { FilmListTitles, CSS_HIDDEN_CLASS } from '../constants.js';
import { getFilmCardComponent } from '../view/filmCard.js';

// ---------------------------------------------------------
// CONSTANTS/ENUMS
const FilmNumbers = {
  DEFAULT: 5,
  TOP_RATED: 2,
  MOST_COMMENTED: 2,
};

// ---------------------------------------------------------
export const getFilmsListComponent = (extra = false, listType = 'DEFAULT') => {
  const extraClass = extra ? 'films-list--extra' : '';

  let films = '';
  for (let i = 0; i < FilmNumbers[listType]; i++) {
    films = films + getFilmCardComponent();
  }

  return `<section class="films-list ${extraClass}">
    <h2 class="films-list__title ${listType === 'DEFAULT' ? CSS_HIDDEN_CLASS : ''}">
      ${FilmListTitles[listType]}
    </h2>

    <div class="films-list__container">
      ${films}
    </div>

  </section>`;
};
