import App from "./app.js";
import Duck from "./duck.js";
import NavButton from "./nav-button.js";
import randomBetween from "../utils/random-between.js";
import Soundbar from "./soundbar.js";

class Game {
  static instance = null;

  reload = false;
  processed = false;
  totalWaves = 5;
  timeBetweenSpawns = 2.5;
  spawns = [];

  constructor(renderContainer) {
    if (Game.instance) {
      throw new Error(
        "Impossible to create the second instance of singleton class"
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
    window.addEventListener("click", this.#onShot);

    while (this.currentWave < this.totalWaves && this.processed) {
      try {
        await this.#startWave();
        this.#nextWave();
        this.spawns.length = 0;
      } catch (e) {
        if (this.processed) this.#onLose();
      }
    }

    this.spawns.length = 0;
    if (this.processed) this.#onWin();
  }

  stop() {
    this.processed = false;
    window.removeEventListener("click", this.#onShot);
    this.spawns.forEach((spawn) => spawn.onClick());
    this.#setDefaults();
  }

  #startWave() {
    const duckStatuses = [];
    for (let i = 1; i <= this.spawnsPerWave && this.processed; i++) {
      duckStatuses.push(
        new Promise((resolve, reject) => {
          const spawn = new Duck(this.renderContainer);
          const spawnContainer = spawn.componentContainer;
          const delay = 1000 * this.timeBetweenSpawns * i;
          spawnContainer.style.top = `${randomBetween(0, this.bottomEdge)}px`;
          spawnContainer.style.left = `-${this.duckWidth}px`;
          this.spawns.push(spawn);

          spawnContainer.addEventListener(
            "click",
            () => {
              if (this.reload) return;
              resolve();
            },
            {
              once: true,
            }
          );

          setTimeout(() => {
            if (this.processed) {
              spawn.render();
              spawn.move(randomBetween(this.minSpeed, this.maxSpeed), reject);
            }
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
    this.spawnsPerWave += 3;
    const { huntedAnimation } = App.instance;
    huntedAnimation.classList.add("app__animation_show");
    Soundbar.play("bark", () => {
      huntedAnimation.classList.remove("app__animation_show");
    });
  }

  #setDefaults() {
    this.maxSpeed = 5;
    this.minSpeed = 7;
    this.currentWave = 1;
    this.spawnsPerWave = 8;
  }

  #setListeners() {
    NavButton.instance.componentContainer.addEventListener(
      "click",
      this.stop.bind(this)
    );
  }

  #onShot(e) {
    const target = e.target;

    if (
      target === NavButton.instance.componentContainer ||
      target.classList.contains("navigation__button_start")
    ) {
      return;
    }

    this.reload = true;

    const { componentContainer } = App.instance;
    componentContainer.classList.add("app_shot");
    componentContainer.addEventListener(
      "transitionend",
      () => componentContainer.classList.remove("app_shot"),
      { once: true }
    );
    Soundbar.play("shot", () => {
      this.reload = false;
    });
  }

  #onWin() {
    this.stop();
    Soundbar.play("win");
  }

  #onLose() {
    this.stop();
    const { laughAnimation } = App.instance;
    laughAnimation.classList.add("app__animation_show");
    Soundbar.play("laugh", () => {
      laughAnimation.classList.remove("app__animation_show");
      Soundbar.play("lose");
    });
  }
}

export default Game;
