const modalImagePreview = document.querySelector("#image-preview-modal");
const previewImage = modalImagePreview.querySelector(".modal__image");
const previewImageTitle = modalImagePreview.querySelector(
  ".modal__image-title"
);

class card {
  //---------------------------CARD CONSTRUCTOR------------------------------->>
  constructor(data, cardSelector, handleImageClick) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this.handleImageClick = handleImageClick;
  }

  //--------------METHOD TO GET THE CARD ELEMENT OUT OF THE TEMPLATE-------------->>
  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);

    return cardElement;
  }

  //-----------METHOD TO ADD EVENT LISTENERS ASSOCIATED WITH THE CARD----------->>
  _setEventListeners() {
    //-----------IMAGE ELEMENT CLICK EVENT LISTENER----------->>
    this._imageElement.addEventListener("click", () => {
      previewImage.setAttribute("src", data.link);
      previewImage.setAttribute("alt", data.name);
      previewImageTitle.textContent = data.name;
      openModal(modalImagePreview);
    });
  }

  //-----------METHOD TO ADD FUNCTIONALITY TO THE CARD TRASH BUTTON----------->>
  _deleteCard() {
    this._trashButton = this._element.querySelector(".card__trash-button");
    this._trashButton.addEventListener("click", () => {
      this._element.remove();
    });
  }

  //-----------METHOD TO ADD FUNCTIONALITY TO THE CARD LIKE BUTTON----------->>
  _likeCard() {
    this._likeButton = this._element.querySelector(".card__like-button");
    this._likeButton.addEventListener("click", () => {
      this._likeButton.classList.toggle("card__like-button_active");
    });
  }

  //--------------METHOD TO POPULATE THE CARD ELEMENT------------------------>>
  generateCard() {
    this._element = this._getTemplate();
    this._imageElement = this._element.querySelector(".card__image");
    this._setEventListeners();
    this._likeCard();
    this._deleteCard();

    this._imageElement.setAttribute("src", this._link);
    this._imageElement.setAttribute("alt", this._name);
    this._element.querySelector(".card__title").textContent = this._name;
    return this._element;
  }
}
