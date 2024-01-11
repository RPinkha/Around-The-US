class card {
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

  _setEventListeners() {}

  _deleteCard() {}

  _likeCard() {}

  //--------------METHOD TO POPULATE THE CARD ELEMENT------------------------>>

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();
    const cardTitle = cardElement.querySelector(".card__title");
    this._element.querySelector(".card__image").setAttribute("src", this._link);
    this._element.querySelector(".card__image").setAttribute("alt", this._name);
    this._element.querySelector(".card__title").textContent = this._name;

    return this._element;
  }
}
