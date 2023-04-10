import Renderable from "./abstracts/renderable.js";

class Navigation extends Renderable {
  componentContainer = document.createElement("div");
  registrationButton = document.createElement("button");
  authButton = document.createElement("button");
  closeButton = document.createElement("button");

  constructor(renderContainer) {
    super(this.navContainer);
    this.renderContainer = renderContainer;
    this.navContainer.classList.add("navigation");
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
      "navigation__button_close"
    );
    this.registrationButton.textContent = "Registration";
    this.authButton.textContent = "Log in";
  }

  render() {
    this.renderContainer.append();
  }
}
