import Modal from "./Modal.js";

export default class ModalWithConfirmation extends Modal {
  //---------------MODALWITHCONFIRMATION CONSTRUCTOR------------------------>>
  constructor(modalSelector, formSubmit, { formSelector }) {
    super(modalSelector);
    this._form = this._modalElement.querySelector(formSelector);
    this._formSubmit = formSubmit;
  }

  //--------ADDS FUNCTIONALITY TO THE SETEVENTLISTENERS METHOD---------->>
  setEventListeners() {
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._formSubmit();
    });
    super.setEventListeners();
  }
}
