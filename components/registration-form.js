import AbstractUserForm from "./abstracts/abstract-user-form.js";
import inputsFactory from "../utils/inputsFactory.js";
import { mainStorage } from "../index.js";

class RegistrationForm extends AbstractUserForm {
  formClasses = ["form_registration"];

  constructor(container) {
    super(container);
    this.container = container;
    this.nameInput = inputsFactory({
      type: "text",
      required: true,
      placeholder: "username",
      name: "name",
      minlength: 4,
      maxlength: 16,
    });
    this.form.classList.add(...this.formClasses);
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
    this.form.addEventListener("submit", this.onSubmit.bind(this));
    this.form.append(
      this.nameInput,
      this.emailInput,
      this.passwordInput,
      this.submitInput
    );
    this.container.append(this.form);
  }
}

export default RegistrationForm;
