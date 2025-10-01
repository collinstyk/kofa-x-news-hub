import { li, p } from "./elements.js";
export default function Category(content, onClick) {
    const text = p();
    text.textContent = content;
    const listItem = li(text);
    if (onClick)
        listItem.addEventListener("click", onClick);
    return listItem;
}
//# sourceMappingURL=Category.js.map