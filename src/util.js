import { MINUTES_IN_HOUR } from './constants.js';

//-----------------------------------------------------------------------
const getRandomInt = (min, max) => {
  if (isNaN(min) || isNaN(min) || min < 0 || max < 0) {
    throw new Error('getRandomInt: Неверные входные параметры');
  }

  const [localMin, localMax] = min > max ? [Math.ceil(max), Math.floor(min)] : [Math.ceil(min), Math.floor(max)];
  const randValue = Math.random();

  return Math.floor(randValue * (localMax - localMin + 1) + localMin);
};

//-----------------------------------------------------------------------
const getRandomFloat = (min, max, precision = 2) => {
  if (isNaN(precision) || precision < 0) {
    throw new Error('getRandomFloat: Неверные входные параметры');
  }

  const multiplier = Math.pow(10, precision);

  return getRandomInt(min * multiplier, max * multiplier) / multiplier;
};

//-----------------------------------------------------------------------
// function returns random value from array
const getRandElemFromArray = (elements) => {
  if (!Array.isArray(elements) || elements.length === 0) {
    throw new Error('getRandElemFromArr: Неверные входные параметры');
  }

  return elements[getRandomInt(0, elements.length - 1)];
};

//-----------------------------------------------------------------------
// function returns array of random length with unique values
const getRandArrayFromValues = (values, allowZeroLength = false) => {
  if (!Array.isArray(values)) {
    throw new Error('getRandArrayFromValues: Неверные входные параметры');
  }

  const randArr = values.filter(() => getRandomInt(0, 100) > 50);

  if (!allowZeroLength && randArr.length === 0) {
    randArr.push(getRandElemFromArray(values));
  }

  return randArr;
};

// ---------------------------------------------------------
// вспомогательная функция для getNode и getNodes
const getResultByDomFunc = (selector, parent = document, originalFuncName, domFunction) => {
  if (typeof selector !== 'string') {
    throw new Error(`${originalFuncName}: селектор должен быть строкой`);
  }

  const elem = parent[domFunction](selector);

  if (!elem) {
    throw new Error(`${originalFuncName}: не найден элемент по селектору ${selector}`);
  }

  return elem;
};

// ---------------------------------------------------------
// функция вовзращает html элемент, по соответствующему selector из parent
const getNode = (selector, parent = document) => getResultByDomFunc(selector, parent, 'getNode', 'querySelector');

// ---------------------------------------------------------
// функция вовзращает html элемент, по соответствующему selector из parent
const getNodes = (selector, parent = document) => getResultByDomFunc(selector, parent, 'getNodes', 'querySelectorAll');

// ---------------------------------------------------------
// функция возвращает случайную продолжительность виде объекта с часами и минутами
const getRandomDuration = (min, max) => {
  const randomMiliseconds = getRandomInt(min, max);
  const hours = Math.floor(randomMiliseconds / MINUTES_IN_HOUR);
  const minutes = randomMiliseconds - hours * MINUTES_IN_HOUR;

  return {
    hours,
    minutes,
  };
};

// ---------------------------------------------------------
// функция сортирует копию входного массива объектов по заданному числовому свойству объекта
const sortArrayOfObjects = (array, property) => {
  return array.slice().sort((item1, item2) => {
    return item2[property] - item1[property];
  });
};

// ---------------------------------------------------------
// функция отрисовывает htmlString в container на месте elementPlace
// {string} elementPlace один из [beforebegin, afterbegin, beforeend, afterend]
const render = (container, htmlString, elementPlace = 'beforeend') => {
  container.insertAdjacentHTML(elementPlace, htmlString);
};

// ---------------------------------------------------------
// функция делает первую букву текста заглавной
const capitalizeFirstLetter = (text) => text[0].toUpperCase() + text.slice(1);

// ---------------------------------------------------------
// EXPORTS

// prettier-ignore
export {
  getRandomInt,
  getRandomFloat,
  getRandElemFromArray,
  getRandArrayFromValues,
  getNode,
  getNodes,
  getRandomDuration,
  render,
  capitalizeFirstLetter,
  sortArrayOfObjects
};
