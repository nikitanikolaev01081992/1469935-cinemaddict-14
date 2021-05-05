import ComponentView from '../view/abstract-component';

// ---------------------------------------------------------

// вспомогательная функция для getNode и getNodes
const getResultByDomFunc = (selector, parent = document, originalFuncName, domFunction) => {
  if (typeof selector !== 'string') {
    throw new Error(`${originalFuncName}: селектор должен быть строкой`);
  }

  if (parent instanceof ComponentView) {
    parent = parent.getElement();
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
// функция удаляет html элемент или component из DOM
const removeNode = (node) => {
  let elem = node;

  if (elem instanceof ComponentView) {
    elem = elem.getElement();
    node.removeElement();
  }

  elem.remove();
};
// ---------------------------------------------------------
// EXPORTS

// prettier-ignore
export {
  getNode,
  getNodes,
  removeNode
};
