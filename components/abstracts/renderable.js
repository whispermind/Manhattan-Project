class Renderable {
  _componentContainer = null;

  constructor(thisContainer) {
    if (this.constructor === Renderable) {
      throw new Error("Cant create the instance of abstract class");
    }

    this.thisContainer = thisContainer;
  }

  get componentContainer() {
    return this._componentContainer;
  }

  set componentContainer(container) {
    return (this._componentContainer = container);
  }

  render() {
    throw new Error("render method must be implemented");
  }

  hide() {
    this.thisContainer.remove();
  }
}

export default Renderable;
