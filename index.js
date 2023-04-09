import App from "./components/app.js";
import Storage from "./utils/storage.js";

const container = document.querySelector(".app");
const storageKey = "someUncollisionableValue";
export const mainStorage = new Storage(
  (data = {}) => localStorage.setItem(storageKey, JSON.stringify(data)),
  () => JSON.parse(localStorage.getItem(storageKey))
);

const app = new App(container);
app.render();
