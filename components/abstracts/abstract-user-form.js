import Renderable from "./renderable.js";
import inputsFactory from "../../utils/inputs-factory.js";

class AbstractUserForm extends Renderable {
  constructor() {
    const form = document.createElement("form");
    super(form);
    if (this.constructor === AbstractUserForm) {
      throw new Error("Cant create the instance of abstract class");
    }

    this.componentContainer = form;
    this.componentContainer.classList.add("form");
    this.formHeader = document.createElement("h2");
    this.formHeader.textContent = "Form";
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
    this.submitInput = inputsFactory({ type: "submit", value: "Submit" });
  }

  onSubmit() {
    throw new Error("onSubmit method must be implemented");
  }
}

export default AbstractUserForm;
