export function decorateObject(json, name) {
  if (!!name) {
    const fm = require(`./${name}.js`).default;
    Object.keys(fm).forEach((fn) => {
      json[fn] = fm[fn];
    });
  }
  return json;
}

export function decorateArray(array, name) {
  const newArr = array.map((json) => {
    decorateObject(json, "date");
    return decorateObject(json, name);
  });
  return newArr;
}

export function decorate(obj, name) {
  if (!obj) {
    return null;
  }
  if (Array.isArray(obj)) {
    return decorateArray(obj, name);
  }
  decorateObject(obj, "date");
  return decorateObject(obj, name);
}
