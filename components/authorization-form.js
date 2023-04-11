import AbstractUserForm from "./abstracts/abstract-user-form.js";
import isElement from "../utils/is-html-element.js";
import Navigation from "./navigation.js";
import { mainStorage } from "../index.js";

class AuthForm extends AbstractUserForm {
  formHeadingText = "Authorization";
  static instance = null;

  constructor(renderContainer) {
    if (AuthForm.instance) {
      throw new Error(
        "Not possible to create the second instance of singleton class"
      );
    }

    if (!renderContainer || !isElement(renderContainer)) {
      throw new Error("Container arugment must be an HTML Element");
    }

    super();

    AuthForm.instance = this;
    this.renderContainer = renderContainer;

    this.#setAttributes();
    this.#setContent();

    this.componentContainer.append(
      this.formHeader,
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
    this.componentContainer.addEventListener(
      "submit",
      this.#onSubmit.bind(this)
    );
  }

  #setContent() {
    this.formHeader.textContent = this.formHeadingText;
  }

  async #onSubmit(e) {
    e.preventDefault();
    const [email, password] = e.target.elements;
    try {
      const users = mainStorage.get();
      let flag = false;
      users.forEach((user) => {
        if (user.password === password && user.email === email) {
          flag = true;
        }
      });
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
