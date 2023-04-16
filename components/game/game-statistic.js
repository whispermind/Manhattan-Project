import Renderable from "../abstracts/renderable.js";
import Game from "./game.js";
import appState from "../app-state.js";

class GameStatistic extends Renderable {
  static instance = null;

  constructor(renderContainer) {
    if (GameStatistic.instance) {
      throw new Error(
        "Impossible to create the second instance of singleton class"
      );
    }

    const componentContainer = document.createElement("div");
    super(componentContainer);
    GameStatistic.instance = this;

    this.componentContainer = componentContainer;
    this.renderContainer = renderContainer;

    this.#setLayout();
    this.#setAttributes();

    this.componentContainer.append(
      this.username,
      this.currentWave,
      this.shots,
      this.timer
    );
  }

  //update displaying stats according to the current game state
  //calling by the interval from game.js module
  refresh() {
    const { shots, hits, timer, currentWave } = Game.instance;

    this.username.textContent = `${
      appState.authorization.username || "Guest"
    } stats:`;
    this.shots.textContent = `Hits: ${hits}/${shots}`;
    this.currentWave.textContent = `Wave: ${currentWave}`;
    this.timer.textContent = `Time: ${timer}`;
  }

  #setLayout() {
    const props = ["username", "shots", "currentWave", "timer"];
    props.forEach((prop) => (this[prop] = document.createElement("div")));
  }

  #setAttributes() {
    this.componentContainer.classList.add("game-stats");
    this.shots.classList.add("game-stats__shots");
    this.currentWave.classList.add("game-stats__wave");
    this.timer.classList.add("game-stats__timer");
  }

  render() {
    this.renderContainer.append(this.componentContainer);
  }
}

export default GameStatistic;
