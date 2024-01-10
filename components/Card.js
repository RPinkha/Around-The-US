class card {
  constructor(data, cardSelector, handleImageClick) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this.handleImageClick = handleImageClick;
  }
  handleImageClick() {}
  _setEventListeners() {}
  _deleteCard() {}
  _likeCard() {}
  generateCard() {}
}
