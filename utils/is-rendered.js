import isElement from "./is-html-element.js";

function isRendered(elem) {
  if (!isElement) {
    throw new Error("Argument must extend HTMLElement");
  }
  return document.body.contains(elem);
}

export default isRendered;
