import RegistrationForm from "./registration-form.js";
import AuthForm from "./authorization-form.js";

class App {
  constructor(container) {
    const grassContainer = document.createElement("div");
    grassContainer.classList.add("app__grass");
    this.container = container;
    this.container.append(grassContainer);
    this.authForm = new AuthForm(container);
    this.registrationForm = new AuthForm(container);
  }

  render() {
    this.registrationForm.render();
  }
}

export default App;
