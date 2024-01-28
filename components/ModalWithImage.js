import Modal from "./Modal.js";

export default class ModalWithImage extends Modal {
  constructor(modalSelector) {
    super(modalSelector);
    this._previewImage = this._modal.querySelector(".modal__image");
    this._previewImageTitle = this._modal.querySelector(".modal__image-title");
  }

  open({ name, link }) {
    this._previewImage.setAttribute("src", link);
    this._previewImage.setAttribute("alt", name);
    this._previewImageTitle.textContent = name;
    super.open();
  }
}
