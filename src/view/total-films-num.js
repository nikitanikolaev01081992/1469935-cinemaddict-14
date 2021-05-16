import ComponentView from './abstract.js';

// ---------------------------------------------------------
const getTotalFilmsNumTemplate = (num) => {
  return `
    <p>${num} movies inside</p>
  `;
};

// ---------------------------------------------------------
export default class TotalFilmsNum extends ComponentView {
  constructor(num = 0) {
    super();
    this._num = num;
  }

  getTemplate() {
    return getTotalFilmsNumTemplate(this._num);
  }
}
