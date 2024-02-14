import Modal from "./Modal.js";

export default class ModalWithConfirmation extends Modal {
  //---------------MODALWITHCONFIRMATION CONSTRUCTOR------------------------>>
  constructor(modalSelector, { submitButtonSelector }) {
    super(modalSelector);
    this._button = this._modalElement.querySelector(submitButtonSelector);
  }

  setCallback(callback) {
    this._callback = callback;
  }

  //--------ADDS FUNCTIONALITY TO THE SETEVENTLISTENERS METHOD---------->>
  setEventListeners() {
    this._button.addEventListener("click", () => {
      this._callback();
    });
    super.setEventListeners();
  }
}
