import Modal from "./Modal.js";

export default class ModalWithForm extends Modal {
  constructor(modalSelector, formSubmit, { formSelector }) {
    super(modalSelector);
    this._form = this._modal.querySelector(formSelector);
    this._formSubmit = formSubmit;
  }

  _getInputValues() {
    const inputList = Array.from(this._form.querySelectorAll(".modal__input"));
    const inputValues = {};
    inputList.forEach((input) => {
      inputValues[input.name] = input.value;
    });
    return inputValues;
  }

  setEventListeners = () => {
    this._form.addEventListener("submit", () => {
      const values = this._getInputValues();
      this._formSubmit(values);
    });
    super.setEventListeners();
  };
}
