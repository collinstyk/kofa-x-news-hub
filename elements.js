function createElement(tag, { className = "", id = "", ...attrs } = {}) {
  const element = document.createElement(tag);
  element.setAttribute("id", id);
  element.setAttribute("class", className);
  for (const [key, value] of Object.entries(attrs)) {
    element.setAttribute(key, String(value));
  }
  return element;
}
const img = (opts) => createElement("img", opts);
const article = (opts) => createElement("article", opts);
const h3 = (opts) => createElement("h3", opts);
const p = (opts) => createElement("p", opts);
const ul = (children, opts) => {
  const element = createElement("ul", opts);
  if (children) element.appendChild(children);
  return element;
};
const li = (children, opts) => {
  const element = createElement("li", opts);
  if (children) element.appendChild(children);
  return element;
};
export { img, article, h3, p, ul, li };
