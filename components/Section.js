export default class Section {
  //------------------SECTION CONSTRUCTOR--------------------------->>
  constructor({ items, renderer }, classSelector) {
    this._items = items;
    this._renderer = renderer;
    this._classSelector = classSelector;
  }
  rendererItems = () => {
    this._items.forEach((item) => {
      this._renderer(item);
    });
  };
  addItem = () => {};
}
