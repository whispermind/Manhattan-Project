import Renderable from "../abstracts/renderable.js";
import loadImage from "../../utils/image-loader.js";
import isRendered from "../../utils/is-rendered.js";

//The game clickable-item
class Duck extends Renderable {
  constructor(renderContainer) {
    const componentContainer = document.createElement("div");
    super(componentContainer);

    this.componentContainer = componentContainer;
    this.renderContainer = renderContainer;
    this.onClick = this.onClick.bind(this);

    this.#setLayout();
    this.#setAttributes();
    this.#setListeners();

    this.componentContainer.append(this.duckImage);
  }

  #setLayout() {
    this.duckImage = document.createElement("img");
  }
  #setAttributes() {
    this.componentContainer.classList.add("game__duck");
    this.duckImage.src = "./assets/gifs/duck-cutted.gif";
    this.duckImage.alt = "flying duck";
  }

  #setListeners() {
    this.duckImage.addEventListener("click", this.onClick, {
      once: true,
    });
  }

  //event starter, game ends with lose event when item reach the right edge of the screen
  move(time, cb) {
    const interval = setInterval(() => {
      if (isRendered(this.componentContainer)) {
        clearInterval(interval);
        this.componentContainer.style.transitionDuration = `${time}s`;
        this.componentContainer.style.transform = `translateX(100vw)`;
        this.componentContainer.addEventListener("transitionend", cb, {
          once: true,
        });
      }
    }, 100);
  }

  //item resolves on click event through the callback
  onClick() {
    const hittedGif = "./assets/gifs/duck-hitted.gif";
    this.componentContainer.style.zIndex = 0;
    loadImage(hittedGif, () => {
      //TODO Fix safari gif transition issue, works well for chrome
      this.duckImage.src = hittedGif;
      setTimeout(this.hide.bind(this), 1000);
    });
  }

  render() {
    this.renderContainer.append(this.componentContainer);
  }
}

export default Duck;
