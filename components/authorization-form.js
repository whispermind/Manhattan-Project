import AbstractUserForm from "./abstracts/abstract-user-form.js";
import isElement from "../utils/is-html-element.js";
import { mainStorage } from "../index.js";

class AuthForm extends AbstractUserForm {
  formHeadingText = "Authorization";

  constructor(renderContainer) {
    if (!renderContainer || !isElement(renderContainer)) {
      throw new Error("Container arugment must be an HTML Element");
    }
    super();
    this.renderContainer = renderContainer;
    this.formHeader.textContent = this.formHeadingText;
    this.componentContainer.classList.add("form_auth");
    this.componentContainer.append(
      this.formHeader,
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
  }

  render() {
    this.renderContainer.append(this.componentContainer);
  }
}

export default AuthForm;
