export default class Section {
  //------------------SECTION CONSTRUCTOR--------------------------->>
  constructor({ items, renderer }, classSelector) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(classSelector);
  }
  //--------METHOD THAT ITTERATES OVER THE ITEMS ARRAY AND RENDERS THEM---------->>
  rendererItems = () => {
    this._items.forEach((item) => {
      this.addItem(this._renderer(item));
    });
  };
  //-------METHOD THAT TAKES A DOM ELEMENT AND ADDS IT TO THE CONTAINER---------->>
  addItem = (element) => {
    this._container.prepend(element);
  };
}
