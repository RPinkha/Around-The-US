export default class Modal {
  //------------------MODAL CONSTRUCTOR--------------------------->>
  constructor(modalSelector) {
    this._popupElement = document.querySelector(modalSelector);
  }
  //--------METHOD THAT ITTERATES OVER THE ITEMS ARRAY AND RENDERS THEM---------->>
  open = () => {
    this._popupElement.classList.add("modal_opened");
    document.addEventListener("keyup", this._handleEscClose);
  };
  //-------METHOD THAT TAKES A DOM ELEMENT AND ADDS IT TO THE CONTAINER---------->>
  close = () => {
    this._popupElement.classList.remove("modal_opened");
    document.removeEventListener("keyup", this._handleEscClose);
  };
  //-------METHOD THAT CLOSES MODAL WITH PRESS OF ESCAPE---------->>
  _handleEscClose = (evt) => {
    if (evt.key === "Escape") {
      this.close();
    }
  };
  //-----METHOD THAT ADDS A CLICK EVENT LISTENER TO THE CLOSE ICON------>>
  setEventListeners = () => {};
}
