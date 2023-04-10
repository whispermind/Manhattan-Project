import AbstractUserForm from "./abstracts/abstract-user-form.js";
import inputsFactory from "../utils/inputs-factory.js";
import isElement from "../utils/is-html-element.js";
import { mainStorage } from "../index.js";

class RegistrationForm extends AbstractUserForm {
  formHeadingText = "Registration";
  

  constructor(renderContainer) {
    if (!renderContainer || !isElement(renderContainer)) {
      throw new Error("Container arugment must be an HTML Element");
    }
    super();
    this.renderContainer = renderContainer;
    this.nameInput = inputsFactory({
      type: "text",
      required: true,
      placeholder: "username",
      name: "name",
      minlength: 4,
      maxlength: 16,
    });
    this.formHeader.textContent = this.formHeadingText;
    this.componentContainer.classList.add("form_registration");
    this.componentContainer.append(
      this.formHeader,
      this.nameInput,
      this.emailInput,
      this.passwordInput,
      this.submitInput
    );
    this.componentContainer.addEventListener(
      "submit",
      this.onSubmit.bind(this)
    );
    this.render = this.render.bind(this);
  }

  async onSubmit(e) {
    e.preventDefault();
    const [name, email, password] = e.target.elements;
    try {
      const users = mainStorage.getItem();
      mainStorage.setItem([...users, { name, email, password }]);
    } catch (err) {
      //unreachable w/o api
    }
  }

  render() {
    this.renderContainer.append(this.componentContainer);
  }
}

export default RegistrationForm;
