import { createElementFromTemplate } from '../util.js';

// ---------------------------------------------------------
const getTotalFilmsNumTemplate = (num) => {
  return `
    <p>${num} movies inside</p>
  `;
};

// ---------------------------------------------------------
export default class TotalFilmsNum {
  constructor(num = 0) {
    this._num = num;
  }

  getTemplate() {
    return getTotalFilmsNumTemplate(this._num);
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
