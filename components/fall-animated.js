import Renderable from "./abstracts/renderable.js";

class FallAnimated {
  #superHide = null;
  constructor(instance) {
    if (!instance instanceof Renderable) {
      throw new Error("The instance argument must extend renderable");
    }
    this.componentContainer = instance.componentContainer;
    this.superHide = instance.hide.bind(instance);
    this.show = instance.show.bind(instance);
    this.render = instance.render.bind(instance);
    this.componentContainer.classList.add("fall-animation");
  }

  hide() {
    container.add.classList("fall-back-animation");
    container.addEventListener("animationend", () => {
      this.#superHide();
      this.componentContainer.classList.remove("fall-back-animation");
    }),
      {
        once: true,
      };
  }
}

export default FallAnimated;
