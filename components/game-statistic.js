import Renderable from "./abstracts/renderable.js";
import Game from "./game.js";

class GameStatistic extends Renderable {
  constructor() {
    this.observer = new this.observer();
  }
}

export default new GameStatistic();
