import Modal from "./Modal.js";

export default class ModalWithImage extends Modal {
  constructor(modalSelector) {
    super(modalSelector);
  }

  open({ name, link }) {
    this._previewImage = modalImagePreview.querySelector(".modal__image");
    this._previewImage.setAttribute("src", link);
    this._previewImage.setAttribute("alt", name);
    this._previewImageTitle = this._previewImage.querySelector(
      ".modal__image-title"
    );
    this._previewImageTitle.textContent = name;
    super.open();
  }
}
