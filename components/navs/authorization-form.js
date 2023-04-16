import AbstractUserForm from "../abstracts/abstract-user-form.js";
import Navigation from "./navigation.js";

class AuthForm extends AbstractUserForm {
  formHeadingText = "Authorization";
  static instance = null;

  constructor(renderContainer) {
    if (AuthForm.instance) {
      throw new Error(
        "Impossible to create the second instance of singleton class"
      );
    }

    super();

    AuthForm.instance = this;
    this.renderContainer = renderContainer;

    this.#setAttributes();

    this.componentContainer.append(
      this.emailInput,
      this.passwordInput,
      this.closeButton,
      this.submitInput
    );

    this.#setListeners();
  }

  #setAttributes() {
    this.componentContainer.classList.add("form_auth");
  }

  #setListeners() {
    this.componentContainer.addEventListener("submit", this.#onSubmit);
  }

  async #onSubmit(e) {
    e.preventDefault();

    const [email, password] = e.target.elements;

    try {
      //undefined request logic
    } catch (err) {
      //unreachable w/o api
    }

    Navigation.instance.animatedAuthForm.hide(() =>
      Navigation.instance.render()
    );
  }

  render() {
    this.renderContainer.append(this.componentContainer);
  }
}

export default AuthForm;
