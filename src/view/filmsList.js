import { FilmListTitle, CSS_HIDDEN_CLASS } from '../constants.js';
import { getFilmCardComponent } from '../view/filmCard.js';

// ---------------------------------------------------------

// ---------------------------------------------------------
export const getFilmsListComponent = (filmsData = [], extra = false, listType = 'DEFAULT') => {
  const extraClass = extra ? 'films-list--extra' : '';

  const films = filmsData.length > 0 ? filmsData.map(getFilmCardComponent).join('') : 'There are no movies in our database';

  return `<section class="films-list ${extraClass}">
    <h2 class="films-list__title ${listType === 'DEFAULT' ? CSS_HIDDEN_CLASS : ''}">
      ${FilmListTitle[listType]}
    </h2>

    <div class="films-list__container">
      ${films}
    </div>

  </section>`;
};
