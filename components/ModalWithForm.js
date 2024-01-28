import Modal from "./Modal.js";

export default class ModalWithForm extends Modal {
  constructor(modalSelector, formSubmit) {
    super(modalSelector);
    this._formSubmit = formSubmit;
  }

  _getInputValues = () => {};

  setEventListeners = () => {
    super.setEventListeners();
  };
}
