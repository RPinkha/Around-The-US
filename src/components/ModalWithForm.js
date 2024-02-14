import Modal from "./Modal.js";

export default class ModalWithForm extends Modal {
  //---------------MODALWITHFORM CONSTRUCTOR------------------------>>
  constructor(
    modalSelector,
    formSubmit,
    { formSelector, submitButtonSelector }
  ) {
    super(modalSelector);
    this._form = this._modalElement.querySelector(formSelector);
    this._formSubmit = formSubmit;
    this._button = this._modalElement.querySelector(submitButtonSelector);
    this._originalButtonText = this._button.textContent;
    this._inputList = Array.from(this._form.querySelectorAll(".modal__input"));
  }

  //------------METHOD THAT CHANGES THE BUTTON TEXT-------------->>
  renderSaving(isSaving) {
    isSaving
      ? (this._button.textContent = "Saving...")
      : (this._button.textContent = this._originalButtonText);
  }

  //------------METHOD THAT COLLECTS THE INPUT VALUES-------------->>
  _getInputValues() {
    const inputValues = {};
    this._inputList.forEach((input) => {
      inputValues[input.name] = input.value;
    });
    return inputValues;
  }
  //--------ADDS FUNCTIONALITY TO THE SETEVENTLISTENERS METHOD---------->>
  setEventListeners() {
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      const values = this._getInputValues();
      this._formSubmit(values);
    });
    super.setEventListeners();
  }
}
