import { createElementFromTemplate } from '../utils/render.js';

// ---------------------------------------------------------
export default class Component {
  constructor() {
    if (new.target === Component) {
      throw new Error('Нельзя создать экземпляр абстрактного класса Component');
    }

    this._element = null;
  }

  getTemplate() {
    throw new Error('Метод getTemplate должен быть переопределён в дочернем классе');
  }

  getElement() {
    if (!this._element) {
      this._element = createElementFromTemplate(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
