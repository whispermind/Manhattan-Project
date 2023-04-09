function loadImage(src, cb) {
  const img = new Image();
  img.src = src;
  img.onload = () => {
    cb();
  };
}

export default loadImage;
