import Renderable from "./abstracts/renderable.js";
import AuthForm from "./authorization-form.js";
import RegistrationForm from "./registration-form.js";
import FallAnimated from "./fall-animated.js";
import NavButton from "./nav-button.js";
import Game from "./game.js";

class Navigation extends Renderable {
  static instance = null;

  constructor(renderContainer) {
    if (Navigation.instance) {
      throw new Error(
        "Impossible to create the second instance of singleton class"
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

    this.game = new Game(renderContainer);
    this.authForm = new AuthForm(renderContainer);
    this.registrationForm = new RegistrationForm(renderContainer);
    this.animatedAuthForm = new FallAnimated(this.authForm);
    this.animatedRegistrationForm = new FallAnimated(this.registrationForm);

    this.componentContainer.append(
      this.registrationButton,
      this.authButton,
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
    this.startButton.classList.add(
      "navigation__button",
      "navigation__button_start"
    );
  }

  #setListeners() {
    const binded = this.#onClick.bind(this);
    this.componentContainer.addEventListener("click", binded);
    NavButton.instance.componentContainer.addEventListener("click", binded);
  }

  #setContent() {
    this.registrationButton.textContent = "Registration";
    this.authButton.textContent = "Log in";
    this.startButton.textContent = "Start";
  }

  #onClick(e) {
    const target = e.target;
    const { animatedNavContainer } = NavButton.instance;
    if (target.tagName === "BUTTON") {
      if (target === this.registrationButton) {
        animatedNavContainer.hide(() => this.animatedRegistrationForm.render());
      } else if (target === this.authButton) {
        animatedNavContainer.hide(() => this.animatedAuthForm.render());
      } else if (target === this.startButton) {
        this.game.start();
      } else {
        animatedNavContainer.hide();
      }
    }
  }

  render() {
    this.renderContainer.append(this.componentContainer);
  }
}

export default Navigation;
