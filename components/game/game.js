import App from "../app.js";
import Duck from "./duck.js";
import NavButton from "../navs/nav-button.js";
import Soundbar from "./soundbar.js";
import GameStatistic from "./game-statistic.js";
import ResultsMessage from "./results-message.js";
import randomBetween from "../../utils/random-between.js";
import loadImage from "../../utils/image-loader.js";

class Game {
  static instance = null;

  #totalWaves = 5;
  #timeBetweenSpawns = 1.5;
  #spawns = [];

  constructor(renderContainer) {
    if (Game.instance) {
      throw new Error(
        "Impossible to create the second instance of singleton class"
      );
    }

    Game.instance = this;
    this.renderContainer = renderContainer;
    this.onShot = this.onShot.bind(this);

    const grassRect = App.instance.grassOverlay.getBoundingClientRect();
    const duck = new Duck(renderContainer);
    const duckImageSrc = duck.duckImage.src;

    loadImage(duckImageSrc, () => {
      duck.render();
      this.duckHeight = duck.componentContainer.offsetHeight;
      this.duckWidth = duck.componentContainer.offsetWidth;
      this.bottomEdge = grassRect.top - this.duckHeight;
      duck.componentContainer.hidden = true;
      duck.onClick();
    });

    this.#setDefaults();
    this.#setListeners();

    this.gameStats = new GameStatistic(renderContainer);
    this.resultsMessage = new ResultsMessage(renderContainer);
  }

  //spawns game-waves, await until the current wave game-items will be resolved before spawn next one
  //rejects on the transitionend event, resolves on the click event
  //game ends with onLose event if rejected, and onWin event if all the waves were resolved
  async start() {
    if (this.processed) return;

    this.processed = true;
    this.started = Date.now();

    this.interval = setInterval(() => {
      setInterval(() => {
        const elapsedTime = Date.now() - this.started;
        this.timer = (elapsedTime / 1000).toFixed(2);
        this.gameStats.refresh();
      }, 100);
    });

    window.addEventListener("click", this.onShot);
    this.gameStats.render();

    while (this.currentWave < this.#totalWaves && this.processed) {
      try {
        await this.#startWave();
        this.#nextWave();
        this.#spawns.length = 0;
      } catch (e) {
        if (this.processed) this.#onLose();
      }
    }

    this.#spawns.length = 0;
    if (this.processed) this.#onWin();
  }

  stop() {
    this.processed = false;

    if (this.interval) clearInterval(this.interval);

    window.removeEventListener("click", this.onShot);
    this.#spawns.forEach((spawn) => spawn.onClick());
    this.gameStats.hide();
    this.#setDefaults();
  }

  // spawns game-items promises which resolves/rejects on click/transitionend events,
  // returns an array of promises for the current wave
  #startWave() {
    const duckStatuses = [];

    for (let i = 1; i <= this.spawnsPerWave && this.processed; i++) {
      duckStatuses.push(
        new Promise((resolve, reject) => {
          const spawn = new Duck(this.renderContainer);
          const spawnContainer = spawn.componentContainer;
          const delay = 1000 * this.#timeBetweenSpawns * i;

          spawnContainer.style.top = `${randomBetween(0, this.bottomEdge)}px`;
          spawnContainer.style.left = `-${this.duckWidth}px`;

          this.#spawns.push(spawn);

          spawnContainer.addEventListener(
            "click",
            () => {
              this.hits++;
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
    this.spawnsPerWave += 1;

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
    this.spawnsPerWave = 3;
    this.shots = 0;
    this.hits = 0;
  }

  #setListeners() {
    NavButton.instance.componentContainer.addEventListener("click", () => {
      this.stop();
      this.resultsMessage.hide();
    });
  }

  onShot(e) {
    const target = e.target;

    if (
      target === NavButton.instance.componentContainer ||
      target.classList.contains("navigation__button_start") ||
      this.reload
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
    this.shots++;
  }

  #onWin() {
    this.win = true;

    this.resultsMessage.refresh();
    this.resultsMessage.render();
    this.stop();

    Soundbar.play("win");
  }

  #onLose() {
    const { laughAnimation } = App.instance;

    this.win = false;

    laughAnimation.classList.add("app__animation_show");

    this.resultsMessage.refresh();
    this.resultsMessage.render();
    this.stop();

    Soundbar.play("laugh", () => {
      laughAnimation.classList.remove("app__animation_show");
      Soundbar.play("lose");
    });
  }
}

export default Game;
