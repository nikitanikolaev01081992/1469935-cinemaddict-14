// ---------------------------------------------------------
// функция сортирует копию входного массива объектов по заданному числовому свойству объекта
const sortArrayOfObjects = (array, property) => {
  return array.slice().sort((item1, item2) => {
    return item2[property] - item1[property];
  });
};

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
// EXPORTS

// prettier-ignore
export {
  sortArrayOfObjects,
  capitalizeFirstLetter,
  updateFilm
};
