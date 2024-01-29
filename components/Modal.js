export default class Modal {
  //------------------MODAL CONSTRUCTOR--------------------------->>
  constructor(modalSelector) {
    this._modalElement = document.querySelector(modalSelector);
  }

  //--------METHOD THAT ITTERATES OVER THE ITEMS ARRAY AND RENDERS THEM---------->>
  open = () => {
    this._modalElement.classList.add("modal_opened");
    document.addEventListener("keyup", this._handleEscClose);
  };

  //-------METHOD THAT TAKES A DOM ELEMENT AND ADDS IT TO THE CONTAINER---------->>
  close = () => {
    this._modalElement.classList.remove("modal_opened");
    document.removeEventListener("keyup", this._handleEscClose);
  };

  //-------METHOD THAT CLOSES MODAL WITH PRESS OF ESCAPE---------->>
  _handleEscClose = (evt) => {
    if (evt.key === "Escape") {
      this.close();
    }
  };

  //-----METHOD THAT ADDS A CLICK EVENT LISTENER TO THE CLOSE ICON------>>
  setEventListeners = () => {
    this._closeButton = this._modalElement.querySelector(".modal__close");
    this._closeButton.addEventListener("click", () => this.close);
    this._modalElement.addEventListener("mousedown", (evt) => {
      if (evt.target === evt.currentTarget) {
        this.close();
      }
    });
  };
}
