import { FilmsListTitles, Films_Numbers, CSS_HIDE_CLASS } from '../constants.js';
import { geFilmCardComponent } from '../view/filmCard.js';

// ---------------------------------------------------------
export const getFilmsListComponent = (extra = false, listType = 'DEFAULT') => {
  const extraClass = extra ? 'films-list--extra' : '';

  let films = '';
  for (let i = 0; i < Films_Numbers[listType]; i++) {
    films = films + geFilmCardComponent();
  }

  return `<section class="films-list ${extraClass}">
    <h2 class="films-list__title ${listType === 'DEFAULT' ? CSS_HIDE_CLASS : ''}">
      ${FilmsListTitles[listType]}
    </h2>

    <div class="films-list__container">
      ${films}
    </div>

  </section>`;
};
