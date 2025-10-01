import { li, p } from "./elements.js";

export default function Category(content: string, onClick?: () => void) {
  const text = p();
  text.textContent = content;
  const listItem = li(text);

  if (onClick) listItem.addEventListener("click", onClick);
  return listItem;
}
