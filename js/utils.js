
/* tagName - string
 * parent - htmlElement
 * textContent - string
 * attributes - object {src: "", alt: ""}
 * */
function makeElement(tagName, parent, textContent, attributes) {
  let element = document.createElement(tagName);
  if (attributes) {
    for (const property in attributes) {
      element.setAttribute(property, attributes[property]);
    }
  }
  if (textContent) {
    element.textContent = textContent;
  }
  parent.appendChild(element);
  return element; // returns the created htmlElement
}
