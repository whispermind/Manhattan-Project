import Renderable from "./abstracts/renderable.js";
import navButton from "./navs/nav-button.js";

class App extends Renderable {
  static instance = null;

  constructor(renderContainer) {
    if (App.instance) {
      throw new Error(
        "Impossible to create the second instance of singleton class"
      );
    }

    super(renderContainer);

    App.instance = this;
    this.componentContainer = renderContainer;
    this.renderContainer = renderContainer;

    this.#setLayout();
    this.#setAttributes();

    this.componentContainer.append(
      this.grassOverlay,
      this.treeOverlay,
      this.laughAnimation,
      this.huntedAnimation
    );

    this.navButton = new navButton(this.componentContainer);
  }

  #setLayout() {
    this.laughAnimation = document.createElement("img");
    this.huntedAnimation = document.createElement("img");
    this.treeOverlay = document.createElement("img");
    this.grassOverlay = document.createElement("div");
  }

  #setAttributes() {
    this.grassOverlay.classList.add("app__grass-overlay");
    this.treeOverlay.classList.add("app__tree-overlay");
    this.laughAnimation.classList.add("app__animation", "app__animation_laugh");
    this.huntedAnimation.classList.add(
      "app__animation",
      "app__animation_hunted"
    );

    this.laughAnimation.src = "./assets/gifs/laugh.gif";
    this.huntedAnimation.src = "./assets/images/hunted.webp";
    this.treeOverlay.src = "./assets/images/tree-overlay.webp";
  }

  render() {
    this.navButton.render();
  }
}

export default App;
