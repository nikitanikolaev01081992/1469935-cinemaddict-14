import dayjs from 'dayjs';

// ---------------------------------------------------------
// функция сортирует по убыванию копию входного массива объектов по заданному числовому свойству объекта
const sortArrayOfObjects = (array, property) => {
  return array.slice().sort((item1, item2) => {
    return item2[property] - item1[property];
  });
};

// ---------------------------------------------------------
// функция сортирует фильмы по дате по убанию
const sortFilmsByDateDown = (films) => sortArrayOfObjects(films, 'date');

// ---------------------------------------------------------
// функция сортирует фильмы по рейтингу по убанию
const sortFilmsByRatingDown = (films) => sortArrayOfObjects(films, 'rating');

// ---------------------------------------------------------
// функция делает первую букву текста заглавной
const capitalizeFirstLetter = (text) => text[0].toUpperCase() + text.slice(1);

// ---------------------------------------------------------
// функция возвращает новый массив фильмов с обновлённым элементом
const updateFilm = (films, updatedFilm) => {
  const index = films.findIndex((film) => film.filmId === updatedFilm.filmId);

  if (index === -1) {
    return films;
  }

  return [...films.slice(0, index), updatedFilm, ...films.slice(index + 1)];
};

// ---------------------------------------------------------
// функция удаляет презентер и возвращает новый список презенторов
const removePresenter = (presentersList, presenter) => {
  const index = presentersList.findIndex((item) => item === presenter);

  if (index === -1) {
    return presentersList;
  }

  return [...presentersList.slice(0, index), ...presentersList.slice(index + 1)];
};

// ---------------------------------------------------------
const parseDuration = (minutes) => dayjs().startOf('date').set('minute', minutes).format('H[h] mm[m]');

// ---------------------------------------------------------
const parseDateObject = (date, format = 'DD MMMM YYYY') => dayjs(date).format(format);

// ---------------------------------------------------------
// EXPORTS

// prettier-ignore
export {
  sortArrayOfObjects,
  sortFilmsByDateDown,
  sortFilmsByRatingDown,
  capitalizeFirstLetter,
  updateFilm,
  removePresenter,
  parseDuration,
  parseDateObject
};
