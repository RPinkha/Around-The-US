import Modal from "./Modal.js";

export default class ModalWithConfirmation extends Modal {
  //---------------MODALWITHCONFIRMATION CONSTRUCTOR------------------------>>
  constructor(modalSelector, { submitButtonSelector }) {
    super(modalSelector);
    this._button = this._modalElement.querySelector(submitButtonSelector);
    this._originalButtonText = this._button.textContent;
  }

  //------------METHOD THAT CHANGES THE BUTTON TEXT-------------->>
  renderSaving(isSaving) {
    isSaving
      ? (this._button.textContent = "Saving...")
      : (this._button.textContent = this._originalButtonText);
  }

  //------------METHOD FOR THE CALLBACK OF THE CONFIRMATION-------------->>
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
