class Renderable {
  constructor(container) {
    if (this.constructor === Renderable) {
      throw new Error("Cant create the instance of abstract class");
    }
    this.container = container;
  }

  render() {
    throw new Error("render method must be implemented");
  }

  show() {
    this.container.setAttribute("display", "none");
  }

  hide() {
    this.container.setAttribute("display", "none");
  }
}

export default Renderable;
