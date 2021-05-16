import AbstractView from './abstract';

// ---------------------------------------------------------
export default class Smart extends AbstractView {
  updateData(newData, isOnlyDataUpdate = false) {
    if (!newData) {
      return;
    }

    this._state = Object.assign({}, this._state, newData);

    if (isOnlyDataUpdate) {
      return;
    }

    this.updateElement();
  }

  updateElement() {
    const prevElement = this._element;

    this.removeElement();

    const newElement = this.getElement();

    prevElement.replaceWith(newElement);

    // надо восстановить обработчики, т.к. был создан новый элемент
    this.restoreHandlers();
  }

  restoreHandlers() {
    throw new Error('Метод restoreHandlers должен быть переопределён в дочернем классе');
  }
}
