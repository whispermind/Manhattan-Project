function loadImage(src, cb) {
  const img = new Image();
  img.src = src;
  img.addEventListener("load", cb), { once: true };
}

export default loadImage;
