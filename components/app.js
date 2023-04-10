import RegistrationForm from "./registration-form.js";
import AuthForm from "./authorization-form.js";
import Renderable from "./abstracts/renderable.js";
import FallAnimated from "./fall-animated.js";

class App extends Renderable {
  grassOverlay = document.createElement("div");

  constructor(renderContainer) {
    super(renderContainer);
    this.componentContainer = renderContainer;
    this.renderContainer = renderContainer;
    this.grassOverlay.classList.add("app__grass-overlay");
    this.componentContainer.append(this.grassOverlay);
    this.authForm = new FallAnimated(new AuthForm(this.componentContainer));
    this.registrationForm = new FallAnimated(
      new RegistrationForm(this.componentContainer)
    );
  }

  render() {
    this.authForm.render();
  }
}

export default App;
