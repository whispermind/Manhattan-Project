import AbstractUserForm from "./abstracts/abstract-user-form.js";
import inputsFactory from "../utils/inputs-factory.js";
import isElement from "../utils/is-html-element.js";
import NavButton from "./nav-button.js";
import Navigation from "./navigation.js";
import { mainStorage } from "../index.js";

class RegistrationForm extends AbstractUserForm {
  formHeadingText = "Registration";
  static instance = null;

  constructor(renderContainer) {
    if (RegistrationForm.instance) {
      throw new Error(
        "Not possible to create the second instance of singleton class"
      );
    }

    if (!renderContainer || !isElement(renderContainer)) {
      throw new Error("Container arugment must be an HTML Element");
    }

    super();
    RegistrationForm.instance = this;
    this.renderContainer = renderContainer;

    this.#setLayout();
    this.#setAttributes();
    this.#setContent();
    this.#setListeners();

    this.componentContainer.append(
      this.closeButton,
      this.formHeader,
      this.nameInput,
      this.emailInput,
      this.passwordInput,
      this.submitInput
    );
  }

  #setLayout() {
    this.nameInput = inputsFactory({
      type: "text",
      required: true,
      placeholder: "username",
      name: "name",
      minlength: 4,
      maxlength: 16,
    });
  }

  #setAttributes() {
    this.componentContainer.classList.add("form_registration");
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
    const [name, email, password] = e.target.elements;
    try {
      const users = mainStorage.getItem();
      mainStorage.setItem([...users, { name, email, password }]);
    } catch (err) {
      //unreachable w/o api
    }
    Navigation.instance.animatedRegistrationForm.hide(() =>
      Navigation.instance.render()
    );
  }

  render() {
    this.renderContainer.append(this.componentContainer);
  }
}

export default RegistrationForm;
