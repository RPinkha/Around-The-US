export default class Card {
  //---------------------------CARD CONSTRUCTOR------------------------------->>
  constructor(data, cardSelector, handleImageClick) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this.handleImageClick = handleImageClick;
  }

  //-----------METHOD TO GET THE CARD ELEMENT OUT OF THE TEMPLATE-------------->>
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
      this.handleImageClick(this._name, this._link);
    });

    //-----------LIKE BUTTON CLICK EVENT LISTENER------------>>
    this._likeButton.addEventListener("click", () => {
      this._likeCard();
    });

    //-----------TRASH BUTTON CLICK EVENT LISTENER----------->>
    this._trashButton.addEventListener("click", () => {
      this._deleteCard();
    });
  }

  //-----------METHOD TO HANDLE CARD TRASH BUTTON CLICK----------->>
  _deleteCard() {
    this._element.remove();
    this._element = null;
  }

  //-----------METHOD TO HANDLE CARD LIKE BUTTON CLICK----------->>
  _likeCard() {
    this._likeButton.classList.toggle("card__like-button_active");
  }

  //--------------METHOD TO POPULATE THE CARD ELEMENT------------------------>>
  generateCard() {
    this._element = this._getTemplate();
    this._imageElement = this._element.querySelector(".card__image");
    this._likeButton = this._element.querySelector(".card__like-button");
    this._trashButton = this._element.querySelector(".card__trash-button");
    this._setEventListeners();

    this._imageElement.setAttribute("src", this._link);
    this._imageElement.setAttribute("alt", this._name);
    this._element.querySelector(".card__title").textContent = this._name;

    return this._element;
  }
}
