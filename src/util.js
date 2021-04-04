// ---------------------------------------------------------
// функция вовзращает html элемент, по соответствующему selector из parent
const getNode = (selector, parent = document) => {
  if (typeof selector !== 'string') {
    throw new Error('getNode: селектор должен быть строкой');
  }

  const elem = parent.querySelector(selector);

  if (!elem) {
    throw new Error(`getNode: не найден элемент по селектору ${selector}`);
  }

  return elem;
};

// ---------------------------------------------------------
// функция отрисовывает htmlString в container на месте elementPlace
// {string} elementPlace один из [beforebegin, afterbegin, beforeend, afterend]
const render = (container, htmlString, elementPlace) => {
  container.insertAdjacentHTML(elementPlace, htmlString);
};

// ---------------------------------------------------------
// EXPORTS
export { getNode, render };
