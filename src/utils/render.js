import ComponentView from '../view/abstract-component.js';

// -----------------------------------------------------------------------
// CONSTANTS/ENUMS
const RenderPosition = {
  AFTER_BEGIN: 'afterbegin',
  BEFORE_END: 'beforeend',
};

// ---------------------------------------------------------
// функция проверяет что element является компонентом и возвращает html элемент
const getElement = (element) => (element instanceof ComponentView ? element.getElement() : element);

// ---------------------------------------------------------
// функция вставляет element в container на место elementPlace
// {string} elementPlace один из [afterbegin, beforeend]
const renderElement = (container, element, elementPlace = RenderPosition.BEFORE_END) => {
  container = getElement(container);
  element = getElement(element);

  if (elementPlace === RenderPosition.AFTER_BEGIN) {
    container.prepend(element);
  } else if (elementPlace === RenderPosition.BEFORE_END) {
    container.append(element);
  }
};

// ---------------------------------------------------------
// функция вставляет elements в конец container
const renderElements = (container, elements) => {
  const documentFragment = document.createDocumentFragment();

  elements.forEach((element) => {
    element = getElement(element);

    documentFragment.append(element);
  });

  renderElement(container, documentFragment);
};

// ---------------------------------------------------------
// функция создаёт и возвращает новый DOM элемент на основе переданной разметки
const createElementFromTemplate = (template) => {
  const wrapper = document.createElement('div');
  wrapper.innerHTML = template;

  return wrapper.firstElementChild;
};

// ---------------------------------------------------------
// EXPORTS

// prettier-ignore
export {
  RenderPosition,
  renderElement,
  renderElements,
  createElementFromTemplate
};
