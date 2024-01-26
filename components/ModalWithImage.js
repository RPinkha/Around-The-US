import Modal from "./Modal.js";

export default class ModalWithImage extends Modal {
  constructor(modalSelector) {
    super(modalSelector);
  }

  opend({ name, link }) {
    this._previewImage = modalImagePreview.querySelector(".modal__image");
    previewImage.setAttribute("src", link);
    previewImage.setAttribute("alt", name);
    previewImageTitle.textContent = name;
    super.open();
  }
}
