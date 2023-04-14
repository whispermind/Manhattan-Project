import Renderable from "./abstracts/renderable.js";
import loadImage from "../utils/image-loader.js";
import isRendered from "../utils/is-rendered.js";

class Duck extends Renderable {
  constructor(renderContainer) {
    const componentContainer = document.createElement("div");
    super(componentContainer);

    this.renderContainer = renderContainer;
    this.componentContainer = componentContainer;
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

  move(time, cb) {
    const interval = setInterval(() => {
      if (isRendered(this.componentContainer)) {
        this.componentContainer.style.transitionDuration = `${time}s`;
        this.componentContainer.style.transform = `translateX(100vw)`;
        this.componentContainer.addEventListener("transitionend", () => cb(), {
          once: true,
        });
        clearInterval(interval);
      }
    }, 100);
  }

  onClick() {
    const hittedGif = "./assets/gifs/duck-hitted.gif";
    if (this.interval) clearInterval(this.interval);
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
