import App from "./app.js";
import Duck from "./duck.js";
import NavButton from "./nav-button.js";
import randomBetween from "../utils/random-between.js";

class Game {
  static instance = null;

  processed = false;
  totalWaves = 5;
  timeBetweenSpawns = 2.5;
  spawns = [];

  constructor(renderContainer) {
    if (Game.instance) {
      throw new Error(
        "Impossible to to create the second instance of singleton class"
      );
    }

    this.instance = this;
    this.renderContainer = renderContainer;

    const grassRect = App.instance.grassOverlay.getBoundingClientRect();
    const duck = new Duck(renderContainer);
    const duckImage = duck.flyingDuck;
    duck.render();

    duckImage.addEventListener(
      "load",
      () => {
        this.duckHeight = duck.componentContainer.offsetHeight;
        this.duckWidth = duck.componentContainer.offsetWidth;
        this.bottomEdge = grassRect.top - this.duckHeight;
        duckImage.hidden = true;
        duck.onClick();
      },
      { once: true }
    );

    this.#setDefaults();
    this.#setListeners();
  }

  async start() {
    if (this.processed) return;
    this.processed = true;

    while (this.currentWave < this.totalWaves && this.processed) {
      try {
        await this.#startWave();
        this.#nextWave();
        this.spawns.length = 0;
      } catch (e) {
        this.#onLose();
      }
    }

    this.spawns.length = 0;
    if (this.processed) this.#onWin();
  }

  #startWave() {
    const duckStatuses = [];
    for (let i = 0; i < this.spawnsPerWave; i++) {
      duckStatuses.push(
        new Promise((resolve, reject) => {
          const spawn = new Duck(this.renderContainer);
          const spawnContainer = spawn.componentContainer;
          const delay = 1000 * this.timeBetweenSpawns * i;
          spawnContainer.style.top = `${randomBetween(0, this.bottomEdge)}px`;
          spawnContainer.style.left = `-${this.duckWidth}px`;
          this.spawns.push(spawn);

          spawnContainer.addEventListener("click", () => resolve(), {
            once: true,
          });

          setTimeout(() => {
            spawn.render();
            spawn.move(randomBetween(this.minSpeed, this.maxSpeed), reject);
          }, delay);
        })
      );
    }
    return Promise.all(duckStatuses);
  }

  #nextWave() {
    this.currentWave++;
    this.maxSpeed--;
    this.minSpeed++;
    this.spawnsPerWave += 1;
  }

  stop() {
    this.processed = false;
    this.spawns.forEach((spawn) => spawn.onClick());
    this.#setDefaults();
  }

  #setDefaults() {
    this.maxSpeed = 7;
    this.minSpeed = 10;
    this.currentWave = 1;
    this.spawnsPerWave = 3;
  }

  #setListeners() {
    NavButton.instance.componentContainer.addEventListener(
      "click",
      this.stop.bind(this)
    );
  }

  #onWin() {
    this.stop();
  }

  #onLose() {
    this.stop();
  }
}

export default Game;
