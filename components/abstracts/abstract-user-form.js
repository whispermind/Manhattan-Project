import Renderable from "./renderable.js";
import inputsFactory from "../../utils/inputsFactory.js";

class AbstractUserForm extends Renderable {
  constructor(container) {
    const form = document.createElement("form");
    super(form);
    if (this.constructor === AbstractUserForm) {
      throw new Error("Cant create the instance of abstract class");
    }

    this.form = form;
    this.form.classList.add("form");
    this.emailInput = inputsFactory({
      type: "email",
      name: "email",
      placeholder: "email",
      required: true,
    });
    this.passwordInput = inputsFactory({
      type: "password",
      name: "password",
      placeholder: "password",
      minlength: 4,
      maxlength: 16,
      required: true,
    });
    this.submitInput = inputsFactory({ type: "submit", value: "Login" });
  }

  onSubmit() {
    throw new Error("onSubmit method must be implemented");
  }
}

export default AbstractUserForm;
