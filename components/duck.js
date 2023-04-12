import Renderable from "./abstracts/renderable.js";
import App from "./app.js";
import loadImage from "../utils/image-loader.js";
import isRendered from "../utils/is-rendered.js";

class Duck extends Renderable {
  //interval = null;

  constructor(renderContainer) {
    const componentContainer = document.createElement("div");
    super(componentContainer);

    this.renderContainer = renderContainer;
    this.componentContainer = componentContainer;
    this.onClick = this.onClick.bind(this);

    this.#setLayout();
    this.#setAttributes();
    this.#setListeners();

    this.componentContainer.append(this.flyingDuck);
  }

  #setLayout() {
    this.flyingDuck = document.createElement("img");
  }
  #setAttributes() {
    this.componentContainer.classList.add("game__duck");
    this.flyingDuck.src = "../assets/gifs/duck-cutted.gif";
    this.flyingDuck.alt = "flying duck";
  }

  #setListeners() {
    this.flyingDuck.addEventListener("click", this.onClick, {
      once: true,
    });
  }

  move(time, cb) {
    //the logic was replaced with transitions to prevent event loop hard traffic
    // this.interval = setInterval(() => {
    //   const width = this.componentContainer.offsetWidth;
    //   const currentPosition = parseInt(this.componentContainer.style.left);
    //   this.componentContainer.style.left = `${currentPosition + step}px`;
    // }, 100);
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
    const hittedGif = "../assets/gifs/duck-hitted.gif";
    if (this.interval) clearInterval(this.interval);
    this.componentContainer.style.zIndex = 0;
    loadImage(hittedGif, () => {
      //TODO Fix safari gif transition issue, works well for chrome
      this.flyingDuck.src = hittedGif;
      setTimeout(this.hide.bind(this), 1000);
    });
  }

  render() {
    this.renderContainer.append(this.componentContainer);
  }
}

export default Duck;
