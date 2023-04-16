import Renderable from "./renderable.js";
import Navigation from "../navs/navigation.js";
import NavButton from "../navs/nav-button.js";
import AuthForm from "../navs/authorization-form.js";
import inputsFactory from "../../utils/inputs-factory.js";

class AbstractUserForm extends Renderable {
  closeListeners = [];

  constructor() {
    const form = document.createElement("form");
    super(form);

    if (this.constructor === AbstractUserForm) {
      throw new Error("Impossible to create the instance of abstract class");
    }

    this.componentContainer = form;

    this.#setLayout();
    this.#setAttributes();
    this.#setContent();

    //navButton-object doesnt exist when constructor beign called
    //awaiting for the object creation by using microtask
    queueMicrotask(this.#setListeners.bind(this));
  }

  addCloseListener(listener) {
    if (typeof listener !== "function") return;
    this.closeListeners.push(listener);
  }

  removeCloseListener(listener) {
    if (typeof listener !== "function") return;
    this.closeListeners = this.closeListeners.filter((foo) => foo !== listener);
  }

  removeCloseListeners() {
    this.closeListeners.length = 0;
  }

  #setLayout() {
    this.formHeader = document.createElement("h2");
    this.closeButton = document.createElement("button");

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

  #setAttributes() {
    this.componentContainer.classList.add("form");
    this.closeButton.classList.add("close-button");
    this.closeButton.type = "button";
  }

  #setContent() {
    this.formHeader.textContent = "Form";
  }

  #setListeners() {
    const binded = this.#onClick.bind(this);
    this.closeButton.addEventListener("click", binded);

    NavButton.instance.componentContainer.addEventListener("click", binded);
  }

  #onClose(e) {
    this.closeListeners.forEach((foo) => {
      foo(e);
    });
  }

  #onClick(e) {
    const target = e.target;
    const method =
      this instanceof AuthForm
        ? "animatedAuthForm"
        : "animatedRegistrationForm";

    if (target === NavButton.instance.componentContainer) {
      Navigation.instance[method].hide(() => Navigation.instance.render());
    }

    if (target === this.closeButton) {
      Navigation.instance[method].hide();
    }
  }

  onSubmit() {
    throw new Error("onSubmit method must be implemented");
  }
}

export default AbstractUserForm;
