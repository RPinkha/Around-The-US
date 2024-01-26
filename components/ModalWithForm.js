import Modal from "./Modal.js";

export default class ModalWithForm extends Modal {
  constructor(modalSelector, formSubmit) {
    super(modalSelector);
    this._formSubmit = formSubmit;
  }

  open() {
    super.open();
  }
}
