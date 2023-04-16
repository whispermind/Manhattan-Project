import AbstractUserForm from "../abstracts/abstract-user-form.js";
import inputsFactory from "../../utils/inputs-factory.js";
import Navigation from "./navigation.js";

class RegistrationForm extends AbstractUserForm {
  formHeadingText = "Registration";
  static instance = null;

  constructor(renderContainer) {
    if (RegistrationForm.instance) {
      throw new Error(
        "Impossible to create the second instance of singleton class"
      );
    }

    super();
    RegistrationForm.instance = this;
    this.renderContainer = renderContainer;

    this.#setLayout();
    this.#setAttributes();
    this.#setListeners();

    this.componentContainer.append(
      this.closeButton,
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
    this.componentContainer.addEventListener("submit", this.#onSubmit);
  }

  async #onSubmit(e) {
    e.preventDefault();

    const [name, email, password] = e.target.elements;

    try {
      //undefined request logic
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
