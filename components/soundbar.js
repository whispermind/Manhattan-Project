class Soundbar {
  sounds = ["lose", "shot", "win", "laugh", "bark"];
  constructor() {
    this.sounds.forEach(
      (sound) => (this[sound] = new Audio(`./assets/sounds/${sound}.mp3`))
    );
  }

  play(sound, cb) {
    if (!this.sounds.includes(sound)) return;
    this[sound].play();
    this[sound].addEventListener("ended", cb, { once: true });
  }
}

export default new Soundbar();
