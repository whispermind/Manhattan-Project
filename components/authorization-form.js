import AbstractUserForm from "./abstracts/abstract-user-form.js";
import { mainStorage } from "../index.js";

class AuthForm extends AbstractUserForm {
  formClasses = ["form_auth"];

  constructor(container) {
    super();
    this.container = container;
    this.form.classList.add(...this.formClasses);
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
    this.form.addEventListener("submit", this.onSubmit.bind(this));
    this.form.append(this.emailInput, this.passwordInput, this.submitInput);
    this.container.append(this.form);
  }
}

export default AuthForm;
