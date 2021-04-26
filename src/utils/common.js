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
// EXPORTS

// prettier-ignore
export {
  sortArrayOfObjects,
  capitalizeFirstLetter
};
