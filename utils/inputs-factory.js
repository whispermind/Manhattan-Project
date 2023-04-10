const attributes = [
  "type",
  "min",
  "max",
  "value",
  "name",
  "accept",
  "checked",
  "disabled",
  "minlength",
  "maxlenght",
  "placeholder",
  "size",
  "step",
  "required",
  "class",
  "id",
];

function inputsFactory(settings) {
  const input = document.createElement("input");
  if (!settings || typeof settings !== "object") return input;
  const entires = Object.entries(settings);
  entires.forEach(([key, value]) => {
    if (attributes.includes(key)) {
      input.setAttribute(key, value);
    }
  });
  return input;
}

export default inputsFactory;
