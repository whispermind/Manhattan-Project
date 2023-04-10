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

  show() {
    if (!this.parent) return;
    this.parent.append(this);
  }

  hide() {
    if (!this.thisContainer.parent) return;
    if (!this.parent) {
      this.parent = this.thisContainer.parent;
    }
    this.thisContainer.remove();
  }
}

export default Renderable;
