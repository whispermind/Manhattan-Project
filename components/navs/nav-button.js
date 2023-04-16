import isRendered from "../../utils/is-rendered.js";
import Renderable from "../abstracts/renderable.js";
import FallAnimated from "../wrappers/fall-animated.js";
import Navigation from "./navigation.js";

class NavButton extends Renderable {
  static instance = null;

  constructor(renderContainer) {
    if (NavButton.instance) {
      throw new Error(
        "Impossible to create the second instance of singleton class"
      );
    }

    const componentContainer = document.createElement("button");
    super(componentContainer);

    NavButton.instance = this;
    this.componentContainer = componentContainer;
    this.renderContainer = renderContainer;

    this.navContainer = new Navigation(this.renderContainer);
    this.animatedNavContainer = new FallAnimated(this.navContainer);

    this.#setAttributes();
    this.#setListeners();
  }

  #setAttributes() {
    this.componentContainer.classList.add("nav-button");
  }

  #setListeners() {
    const binded = this.#onClick.bind(this);
    this.navContainer.componentContainer.addEventListener("click", binded);
    this.componentContainer.addEventListener("click", binded);
  }

  #onClick(e) {
    const target = e.target;

    if (target.tagName === "BUTTON" && target !== this.componentContainer) {
      this.animatedNavContainer.hide();
    } else if (target === this.componentContainer) {
      if (isRendered(this.navContainer.componentContainer)) {
        this.animatedNavContainer.hide();
      } else {
        this.animatedNavContainer.render();
      }
    }
  }

  render() {
    this.renderContainer.append(this.componentContainer);
  }
}

export default NavButton;
