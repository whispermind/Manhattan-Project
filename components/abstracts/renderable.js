import isElement from "../../utils/is-html-element.js";

//Using by all the renderable classes of the app
class Renderable {
  _componentContainer = null;
  _renderContainer = null;

  constructor(thisContainer) {
    if (this.constructor === Renderable) {
      throw new Error("Impossible to create the instance of abstract class");
    }

    this.thisContainer = thisContainer;
  }

  get componentContainer() {
    return this._componentContainer;
  }

  set componentContainer(container) {
    if (!isElement(container)) {
      throw new Error("Container must extend HTMLElement");
    }
    return (this._componentContainer = container);
  }

  get renderContainer() {
    return this._renderContainer;
  }

  set renderContainer(container) {
    if (!isElement(container)) {
      throw new Error("Container must extend HTMLElement");
    }
    return (this._renderContainer = container);
  }

  render() {
    throw new Error("Render method must be implemented");
  }

  hide() {
    this.thisContainer.remove();
  }
}

export default Renderable;
