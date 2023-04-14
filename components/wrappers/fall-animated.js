import Renderable from "../abstracts/renderable.js";
import isRendered from "../../utils/is-rendered.js";

//Class-wrapper to animate Renderable objects
class FallAnimated {
  #superHide = null;
  #superRender = null;

  constructor(instance) {
    if (!instance instanceof Renderable) {
      throw new Error("The instance argument must extend renderable");
    }

    this.componentContainer = instance.componentContainer;
    this.componentContainer.classList.add("fall-animation");
    this.#superHide = instance.hide.bind(instance);
    this.#superRender = instance.render.bind(instance);
    this.throttle = false;
  }

  hide(cb) {
    if (!isRendered(this.componentContainer)) return;
    this.throttle = true;
    this.componentContainer.classList.add("fall-back-animation");
    this.componentContainer.addEventListener(
      "animationend",
      () => {
        this.#superHide();
        this.componentContainer.classList.remove("fall-back-animation");
        this.throttle = false;
        if (typeof cb === "function") cb();
      },
      {
        once: true,
      }
    );
  }

  render() {
    if (this.throttle) return;
    this.#superRender();
  }
}

export default FallAnimated;
