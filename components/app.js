import Renderable from "./abstracts/renderable.js";
import navButton from "./nav-button.js";

class App extends Renderable {
  static instance = null;
  constructor(renderContainer) {
    if (App.instance) {
      throw new Error(
        "Impossible to to create the second instance of singleton class"
      );
    }

    super(renderContainer);

    App.instance = this;
    this.componentContainer = renderContainer;
    this.renderContainer = renderContainer;

    this.#setLayout();
    this.#setAttributes();

    this.componentContainer.append(this.grassOverlay);
    this.navButton = new navButton(this.componentContainer);
  }

  #setLayout() {
    this.grassOverlay = document.createElement("div");
  }

  #setAttributes() {
    this.grassOverlay.classList.add("app__grass-overlay");
  }

  render() {
    this.navButton.render();
  }
}

export default App;
