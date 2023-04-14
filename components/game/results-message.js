import Renderable from "../abstracts/renderable.js";
import Game from "./game.js";

class ResultsMessage extends Renderable {
  constructor(renderContainer) {
    const componentContainer = document.createElement("div");
    super(componentContainer);
    ResultsMessage.instance = this;

    this.componentContainer = componentContainer;
    this.renderContainer = renderContainer;
    
    this.#setLayout();
    this.#setAttributes();
    this.#setListeners();

    this.componentContainer.append(this.message, this.closeButton);
  }

  //update message according to the current game state
  refresh() {
    const { win, hits, timer, currentWave } = Game.instance;
    const onWin = `Congratulations, you got ${hits} ducks in ${timer} seconds`;
    const onLose = `Unfortunately u couldnt handle the wave ${currentWave}, have a better luck next time`;
    this.message.textContent = win ? onWin : onLose;
  }

  #setLayout() {
    this.closeButton = document.createElement("button");
    this.message = document.createElement("p");
  }

  #setAttributes() {
    this.componentContainer.classList.add("result");
    this.closeButton.classList.add("result__close-button", "close-button");
    this.message.classList.add("result__message");
  }

  #setListeners() {
    this.closeButton.addEventListener("click", this.hide.bind(this));
  }

  render() {
    this.renderContainer.append(this.componentContainer);
  }
}

export default ResultsMessage;
