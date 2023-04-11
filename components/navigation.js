import Renderable from "./abstracts/renderable.js";
import AuthForm from "./authorization-form.js";
import RegistrationForm from "./registration-form.js";
import FallAnimated from "./fall-animated.js";
import NavButton from "./nav-button.js";

class Navigation extends Renderable {
  static instance = null;

  constructor(renderContainer) {
    if (Navigation.instance) {
      throw new Error(
        "Not possible to create the second instance of singleton class"
      );
    }

    const componentContainer = document.createElement("div");
    super(componentContainer);

    Navigation.instance = this;
    this.componentContainer = componentContainer;
    this.renderContainer = renderContainer;

    this.#setLayout();
    this.#setAttributes();
    this.#setContent();
    this.#setListeners();

    this.authForm = new AuthForm(renderContainer);
    this.registrationForm = new RegistrationForm(renderContainer);
    this.animatedAuthForm = new FallAnimated(this.authForm);
    this.animatedRegistrationForm = new FallAnimated(this.registrationForm);

    this.componentContainer.append(
      this.authButton,
      this.registrationButton,
      this.startButton,
      this.closeButton
    );
  }

  #setLayout() {
    const propNames = [
      "registrationButton",
      "authButton",
      "closeButton",
      "startButton",
    ];
    propNames.forEach(
      (prop) => (this[prop] = document.createElement("button"))
    );
  }

  #setAttributes() {
    this.componentContainer.classList.add("navigation");
    this.registrationButton.classList.add(
      "navigation__button",
      "navigation__button_registration"
    );
    this.authButton.classList.add(
      "navigation__button",
      "navigation__button_auth"
    );
    this.closeButton.classList.add(
      "navigation__button",
      "navigation__button_close",
      "close-button"
    );
  }

  #setListeners() {
    this.componentContainer.addEventListener("click", this.#onClick.bind(this));
    NavButton.instance.componentContainer.addEventListener(
      "click",
      this.#onClick.bind(this)
    );
  }

  #setContent() {
    this.registrationButton.textContent = "Registration";
    this.authButton.textContent = "Log in";
    this.startButton.textContent = "Start";
  }

  #onClick(e) {
    const target = e.target;
    if (target.tagName === "BUTTON") {
      if (target === this.registrationButton) {
        NavButton.instance.animatedNavContainer.hide(() =>
          this.animatedRegistrationForm.render()
        );
      } else if (target === this.authButton) {
        NavButton.instance.animatedNavContainer.hide(() =>
          this.animatedAuthForm.render()
        );
      } else {
        NavButton.instance.animatedNavContainer.hide();
      }
    }
  }

  render() {
    this.renderContainer.append(this.componentContainer);
  }
}

export default Navigation;
